#!/usr/bin/env python3
"""
add_adsense_script.py

Recursively injects the standard Google AdSense loader script into the
<head> of all production HTML files. This is the script tag that:
  1. Actually serves ads once your site is approved, and
  2. Delivers the GDPR / US-state consent messages you configure in
     AdSense > Privacy & messaging (those messages ride on this script;
     no separate consent snippet is needed in the common case).

Usage:
    python add_adsense_script.py --dry-run        # preview only
    python add_adsense_script.py                   # apply changes
    python add_adsense_script.py --backup          # write .bak copies first
    python add_adsense_script.py --root /path      # scan a different root

Exit code is 0 on success (even with 0 modifications), non-zero if any file
errored out while being processed.
"""

import argparse
import os
import re
import sys

ADSENSE_CLIENT_ID = "ca-pub-1114757923146718"
SCRIPT_TAG = (
    f'<script async src="https://pagead2.googlesyndication.com/pagead/js/'
    f'adsbygoogle.js?client={ADSENSE_CLIENT_ID}" crossorigin="anonymous"></script>'
)

EXCLUDED_DIR_NAMES = {
    "components",
    "Designs",
    "designs",
    ".git",
    "node_modules",
    "dist",
    "build",
}

HEAD_TAG_RE = re.compile(r"<head\b[^>]*>", re.IGNORECASE)
# Matches the existing AdSense verification meta tag, if present, so we can
# anchor the loader script directly after it (matching the documented plan).
# Tolerates extra whitespace around '=' in the name attribute.
ADSENSE_META_RE = re.compile(
    r'<meta\b[^>]*\bname\s*=\s*["\']google-adsense-account["\'][^>]*>', re.IGNORECASE
)
# Matches the adsbygoogle.js loader by its actual host + path, regardless of
# query parameters (client id, future params) or attribute order/spacing.
EXISTING_SCRIPT_RE = re.compile(
    r"pagead2\.googlesyndication\.com/pagead/js/adsbygoogle\.js", re.IGNORECASE
)


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
    has_bom = raw.startswith(b"\xef\xbb\xbf")
    if has_bom:
        raw = raw[3:]
    if b"\r\n" in raw:
        newline = "\r\n"
    elif b"\r" in raw and b"\n" not in raw:
        newline = "\r"
    else:
        newline = "\n"
    text = raw.decode("utf-8")
    return text, newline, has_bom


def write_file_preserve_newline(path, text, newline, has_bom=False):
    normalized = text.replace("\r\n", "\n").replace("\r", "\n")
    if newline != "\n":
        normalized = normalized.replace("\n", newline)
    encoded = normalized.encode("utf-8")
    if has_bom:
        encoded = b"\xef\xbb\xbf" + encoded
    with open(path, "wb") as f:
        f.write(encoded)


def process_file(path, dry_run, backup):
    """
    Returns (status, detail):
    status in: 'modified', 'already_present', 'no_head', 'error', 'duplicate'
    """
    try:
        text, newline, has_bom = read_file_preserve_newline(path)
    except Exception as e:
        return ("error", str(e))

    occurrences = len(EXISTING_SCRIPT_RE.findall(text))
    if occurrences >= 1:
        if occurrences > 1:
            return ("duplicate", f"{occurrences} existing loader scripts found")
        return ("already_present", None)

    # Prefer anchoring right after the existing AdSense verification meta tag,
    # if present, so file order matches the documented plan. Fall back to
    # anchoring right after <head> if no meta tag is found yet.
    meta_match = ADSENSE_META_RE.search(text)
    anchor_match = meta_match if meta_match else HEAD_TAG_RE.search(text)
    if not anchor_match:
        return ("no_head", None)

    line_start = text.rfind("\n", 0, anchor_match.start()) + 1
    anchor_line_prefix = text[line_start:anchor_match.start()]
    indent = re.match(r"[ \t]*", anchor_line_prefix).group(0)
    # Match the anchor line's own indentation (same level as the meta tag,
    # or one level deeper than <head> if no meta tag exists yet).
    child_indent = indent if meta_match else (indent + "    " if indent else "    ")

    insertion = f"\n{child_indent}{SCRIPT_TAG}"
    new_text = text[:anchor_match.end()] + insertion + text[anchor_match.end():]

    if dry_run:
        return ("modified", None)

    try:
        if backup:
            with open(path + ".bak", "wb") as bak:
                with open(path, "rb") as orig:
                    bak.write(orig.read())
        write_file_preserve_newline(path, new_text, newline, has_bom)
    except Exception as e:
        return ("error", str(e))

    return ("modified", None)


def main():
    parser = argparse.ArgumentParser(description="Inject the AdSense loader script into HTML files.")
    parser.add_argument("--root", default=".", help="Root directory to scan (default: current directory)")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without writing files")
    parser.add_argument("--backup", action="store_true", help="Write a .bak copy before modifying each file")
    args = parser.parse_args()

    root = os.path.abspath(args.root)
    if not os.path.isdir(root):
        print(f"Error: root path does not exist or is not a directory: {root}")
        sys.exit(1)

    html_files = find_html_files(root)

    results = {"modified": [], "already_present": [], "no_head": [], "error": [], "duplicate": []}

    for fpath in html_files:
        rel = os.path.relpath(fpath, root)
        status, detail = process_file(fpath, args.dry_run, args.backup)
        results[status].append((rel, detail))

    prefix = "Would modify" if args.dry_run else "Modified"
    if results["modified"]:
        print(f"{prefix}:")
        for rel, _ in results["modified"]:
            print(f"  \u2713 {rel}")
        print()

    if results["already_present"]:
        print("Already had loader script (skipped):")
        for rel, _ in results["already_present"]:
            print(f"  - {rel}")
        print()

    if results["duplicate"]:
        print("WARNING - multiple loader scripts found (skipped, needs manual review):")
        for rel, detail in results["duplicate"]:
            print(f"  ! {rel} ({detail})")
        print()

    if results["no_head"]:
        print("Skipped (no <head> tag found):")
        for rel, _ in results["no_head"]:
            print(f"  - {rel}")
        print()

    if results["error"]:
        print("Errors:")
        for rel, detail in results["error"]:
            print(f"  X {rel}: {detail}")
        print()

    print("Summary")
    print("-------")
    print(f"Scanned:              {len(html_files)}")
    print(f"{'Would modify' if args.dry_run else 'Modified':<22}{len(results['modified'])}")
    print(f"Already present:      {len(results['already_present'])}")
    print(f"Duplicates found:     {len(results['duplicate'])}")
    print(f"Skipped (no head):    {len(results['no_head'])}")
    print(f"Errors:               {len(results['error'])}")

    if args.dry_run:
        print("\nDry run complete. No files were modified. Re-run without --dry-run to apply changes.")

    sys.exit(1 if results["error"] else 0)


if __name__ == "__main__":
    main()
