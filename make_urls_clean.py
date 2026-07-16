#!/usr/bin/env python3
"""
make_urls_clean.py

Converts the website to use clean, extensionless URLs (Option B) by:
1. Stripping '.html' from href attributes in all production HTML files (for local links).
2. Stripping '.html' from canonical link tags in all production HTML files.
3. Stripping '.html' from og:url meta tags in all production HTML files.
4. Stripping '.html' from URLs in sitemap.xml.
5. Injecting "cleanUrls": true into vercel.json.
"""

import argparse
import json
import os
import re
import sys

EXCLUDED_DIR_NAMES = {
    "components",
    "Designs",
    "designs",
    ".git",
    "node_modules",
    "dist",
    "build",
}


def is_excluded(path, root):
    rel = os.path.relpath(path, root)
    parts = rel.split(os.sep)
    return any(part in EXCLUDED_DIR_NAMES for part in parts)


def find_html_files(root):
    html_files = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDED_DIR_NAMES]
        for fname in filenames:
            if fname.lower().endswith(".html"):
                fpath = os.path.join(dirpath, fname)
                if not is_excluded(fpath, root):
                    html_files.append(fpath)
    return sorted(html_files)


def read_file_preserve_newline(path):
    with open(path, "rb") as f:
        raw = f.read()
    if b"\r\n" in raw:
        newline = "\r\n"
    elif b"\r" in raw and b"\n" not in raw:
        newline = "\r"
    else:
        newline = "\n"
    text = raw.decode("utf-8")
    return text, newline


def write_file_preserve_newline(path, text, newline):
    normalized = text.replace("\r\n", "\n").replace("\r", "\n")
    if newline != "\n":
        normalized = normalized.replace("\n", newline)
    with open(path, "wb") as f:
        f.write(normalized.encode("utf-8"))


def clean_href_match(match):
    full_tag = match.group(0)
    url = match.group(1)
    
    # Check if this is a local link or points to mortgageproglobal.com
    is_local = False
    if url.startswith("/") or not ("://" in url):
        # Filter out mailto:, tel:, javascript:, or hash-only links
        if not re.match(r'^(mailto:|tel:|javascript:|#)', url, re.IGNORECASE):
            is_local = True
    elif url.startswith("https://mortgageproglobal.com") or url.startswith("http://mortgageproglobal.com"):
        is_local = True

    if is_local:
        # Strip .html extension before any anchor (#) or query parameter (?)
        new_url = re.sub(r'\.html(?=[#\?]|$)', '', url)
        # Preserve original quotes
        quote = full_tag[5] # href=" or href='
        return f'href={quote}{new_url}{quote}'
    return full_tag


def clean_meta_tags(text):
    def replace_meta(match):
        meta_tag = match.group(0)
        # Check if og:url is defined in property or name attributes
        if 'og:url' in meta_tag:
            content_match = re.search(r'content=["\']([^"\']+)["\']', meta_tag)
            if content_match:
                url = content_match.group(1)
                new_url = re.sub(r'\.html(?=[#\?]|$)', '', url)
                return meta_tag.replace(url, new_url)
        return meta_tag
    
    return re.sub(r'<meta\b[^>]+>', replace_meta, text)


def clean_canonical_tags(text):
    def replace_canonical(match):
        link_tag = match.group(0)
        if 'rel="canonical"' in link_tag or "rel='canonical'" in link_tag or 'rel=canonical' in link_tag:
            href_match = re.search(r'href=["\']([^"\']+)["\']', link_tag)
            if href_match:
                url = href_match.group(1)
                new_url = re.sub(r'\.html(?=[#\?]|$)', '', url)
                return link_tag.replace(url, new_url)
        return link_tag
        
    return re.sub(r'<link\b[^>]+>', replace_canonical, text)


def process_html_file(path, dry_run):
    try:
        text, newline = read_file_preserve_newline(path)
    except Exception as e:
        return False, f"Error reading: {e}"

    original_text = text
    
    # 1. Clean href attributes
    text = re.sub(r'href=["\']([^"\']+)["\']', clean_href_match, text)
    
    # 2. Clean canonical links
    text = clean_canonical_tags(text)
    
    # 3. Clean og:url meta tags
    text = clean_meta_tags(text)
    
    if text == original_text:
        return False, "No modifications needed"
        
    if not dry_run:
        try:
            write_file_preserve_newline(path, text, newline)
        except Exception as e:
            return False, f"Error writing: {e}"
            
    return True, "Cleaned successfully"


def process_sitemap(path, dry_run):
    if not os.path.exists(path):
        return False, "Sitemap file does not exist"
    try:
        text, newline = read_file_preserve_newline(path)
    except Exception as e:
        return False, f"Error reading sitemap: {e}"
        
    original_text = text
    # Strip .html from URLs inside <loc>...</loc>
    new_text = re.sub(r'(<loc>https://mortgageproglobal\.com/[^<]*?)\.html(</loc>)', r'\1\2', text)
    
    if new_text == original_text:
        return False, "No changes needed in sitemap"
        
    if not dry_run:
        try:
            write_file_preserve_newline(path, new_text, newline)
        except Exception as e:
            return False, f"Error writing sitemap: {e}"
            
    return True, "Sitemap cleaned successfully"


def update_vercel_json(path, dry_run):
    if not os.path.exists(path):
        return False, "vercel.json does not exist"
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        return False, f"Error reading vercel.json: {e}"
        
    if data.get("cleanUrls") is True:
        return False, "cleanUrls already set to true in vercel.json"
        
    # Reconstruct with cleanUrls at the top level
    new_data = {"cleanUrls": True}
    new_data.update(data)
    
    if not dry_run:
        try:
            with open(path, "w", encoding="utf-8") as f:
                json.dump(new_data, f, indent=2)
                f.write("\n") # preserve trailing newline
        except Exception as e:
            return False, f"Error writing vercel.json: {e}"
            
    return True, "vercel.json updated with cleanUrls: true"


def main():
    parser = argparse.ArgumentParser(description="Convert to clean extensionless URLs.")
    parser.add_argument("--root", default=".", help="Root directory of the project")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without writing")
    args = parser.parse_args()

    root = os.path.abspath(args.root)
    if not os.path.isdir(root):
        print(f"Error: root directory does not exist: {root}")
        sys.exit(1)

    html_files = find_html_files(root)
    
    # Process header and footer templates explicitly if they are not in os.walk
    # (since components/ is excluded by default to avoid modifying template partials
    # as standalone pages, but we *do* want to fix internal links inside them!)
    components_dir = os.path.join(root, "components")
    if os.path.isdir(components_dir):
        for fname in os.listdir(components_dir):
            if fname.lower().endswith(".html"):
                html_files.append(os.path.join(components_dir, fname))

    modified_count = 0
    skipped_count = 0
    
    print(f"Scanning HTML files for URL cleaning...")
    for fpath in sorted(html_files):
        rel = os.path.relpath(fpath, root)
        success, msg = process_html_file(fpath, args.dry_run)
        if success:
            print(f"  * Cleaned: {rel}")
            modified_count += 1
        else:
            skipped_count += 1

    # Clean sitemap.xml
    sitemap_path = os.path.join(root, "sitemap.xml")
    sitemap_success, sitemap_msg = process_sitemap(sitemap_path, args.dry_run)
    if sitemap_success:
        print(f"  * Cleaned sitemap.xml: {sitemap_msg}")
    else:
        print(f"  - Sitemap.xml skipped: {sitemap_msg}")

    # Update vercel.json
    vercel_path = os.path.join(root, "vercel.json")
    vercel_success, vercel_msg = update_vercel_json(vercel_path, args.dry_run)
    if vercel_success:
        print(f"  * Updated vercel.json: {vercel_msg}")
    else:
        print(f"  - Vercel.json skipped: {vercel_msg}")

    print("\nSummary")
    print("-------")
    print(f"HTML Files Processed: {len(html_files)}")
    print(f"HTML Files Cleaned:   {modified_count}")
    print(f"Sitemap updated:      {'Yes' if sitemap_success else 'No'}")
    print(f"vercel.json updated:  {'Yes' if vercel_success else 'No'}")
    
    if args.dry_run:
        print("\nDry-run complete. No files were written.")


if __name__ == "__main__":
    main()
