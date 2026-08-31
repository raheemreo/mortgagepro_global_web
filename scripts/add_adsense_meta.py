#!/usr/bin/env python3
"""
add_adsense_meta.py

Recursively injects the Google AdSense account verification meta tag into
the <head> of all production HTML files, while skipping excluded directories,
files that already have the tag, and files with no <head> tag.

Usage:
    python add_adsense_meta.py                 # dry run by default is OFF; this performs the write
    python add_adsense_meta.py --dry-run        # preview only, no files modified
    python add_adsense_meta.py --backup         # write .bak copies before modifying
    python add_adsense_meta.py --root /path     # scan a different root (default: current dir)

Exit code is 0 on success (even with 0 modifications), non-zero if any file
errored out while being processed.
"""

import argparse
import os
import re
import sys

ADSENSE_CONTENT = "ca-pub-1114757923146718"
META_TAG = f'<meta name="google-adsense-account" content="{ADSENSE_CONTENT}">'

# Directory names to exclude anywhere in the path (case-sensitive match on
# path segments, since 'Designs' vs 'designs' etc. can vary by repo).
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
EXISTING_TAG_RE = re.compile(r'<meta[^>]+name=["\']google-adsense-account["\']', re.IGNORECASE)


def is_excluded(path, root):
    """Return True if any path segment (relative to root) is in the exclude list."""
    rel = os.path.relpath(path, root)
    parts = rel.split(os.sep)
    return any(part in EXCLUDED_DIR_NAMES for part in parts)


def find_html_files(root):
    html_files = []
    for dirpath, dirnames, filenames in os.walk(root):
        # Prune excluded directories in-place so os.walk doesn't descend into them
        dirnames[:] = [
            d for d in dirnames
            if d not in EXCLUDED_DIR_NAMES
        ]
        for fname in filenames:
            if fname.lower().endswith(".html"):
                fpath = os.path.join(dirpath, fname)
                if not is_excluded(fpath, root):
                    html_files.append(fpath)
    return sorted(html_files)


def read_file_preserve_newline(path):
    """Read raw bytes, decode as UTF-8, and detect the dominant newline style."""
    with open(path, "rb") as f:
        raw = f.read()
    # Detect newline style before decoding-related normalization happens
    if b"\r\n" in raw:
        newline = "\r\n"
    elif b"\r" in raw and b"\n" not in raw:
        newline = "\r"
    else:
        newline = "\n"
    text = raw.decode("utf-8")
    return text, newline


def write_file_preserve_newline(path, text, newline):
    # Normalize internal representation to \n, then convert to target newline
    # to avoid double-converting if the text already used that newline.
    normalized = text.replace("\r\n", "\n").replace("\r", "\n")
    if newline != "\n":
        normalized = normalized.replace("\n", newline)
    with open(path, "wb") as f:
        f.write(normalized.encode("utf-8"))


def process_file(path, dry_run, backup):
    """
    Returns a tuple: (status, detail)
    status is one of: 'modified', 'already_tagged', 'no_head', 'error', 'duplicate_tag'
    """
    try:
        text, newline = read_file_preserve_newline(path)
    except Exception as e:
        return ("error", str(e))

    occurrences = len(EXISTING_TAG_RE.findall(text))
    if occurrences >= 1:
        if occurrences > 1:
            return ("duplicate_tag", f"{occurrences} existing tags found")
        return ("already_tagged", None)

    match = HEAD_TAG_RE.search(text)
    if not match:
        return ("no_head", None)

    # Determine indentation from the line the <head> tag is on
    line_start = text.rfind("\n", 0, match.start()) + 1
    head_line_prefix = text[line_start:match.start()]
    indent = re.match(r"[ \t]*", head_line_prefix).group(0)
    # Use one extra level of indentation for the injected tag, falling back
    # to 2 spaces if <head> itself had no indentation.
    child_indent = indent + "  " if indent else "  "

    insertion = f"\n{child_indent}{META_TAG}"
    new_text = text[:match.end()] + insertion + text[match.end():]

    if dry_run:
        return ("modified", None)

    try:
        if backup:
            with open(path + ".bak", "wb") as bak:
                with open(path, "rb") as orig:
                    bak.write(orig.read())
        write_file_preserve_newline(path, new_text, newline)
    except Exception as e:
        return ("error", str(e))

    return ("modified", None)


def main():
    parser = argparse.ArgumentParser(description="Inject AdSense meta tag into HTML files.")
    parser.add_argument("--root", default=".", help="Root directory to scan (default: current directory)")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without writing files")
    parser.add_argument("--backup", action="store_true", help="Write a .bak copy before modifying each file")
    args = parser.parse_args()

    root = os.path.abspath(args.root)
    if not os.path.isdir(root):
        print(f"Error: root path does not exist or is not a directory: {root}")
        sys.exit(1)

    html_files = find_html_files(root)

    results = {
        "modified": [],
        "already_tagged": [],
        "no_head": [],
        "error": [],
        "duplicate_tag": [],
    }

    for fpath in html_files:
        rel = os.path.relpath(fpath, root)
        status, detail = process_file(fpath, args.dry_run, args.backup)
        results[status].append((rel, detail))

    prefix = "Would modify" if args.dry_run else "Modified"
    if results["modified"]:
        print(f"{prefix}:")
        for rel, _ in results["modified"]:
            print(f"  * {rel}")
        print()

    if results["already_tagged"]:
        print("Already contained tag (skipped):")
        for rel, _ in results["already_tagged"]:
            print(f"  - {rel}")
        print()

    if results["duplicate_tag"]:
        print("WARNING - multiple existing tags found (skipped, needs manual review):")
        for rel, detail in results["duplicate_tag"]:
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
    print(f"Already contained tag: {len(results['already_tagged'])}")
    print(f"Duplicate tags found:  {len(results['duplicate_tag'])}")
    print(f"Skipped (no head):     {len(results['no_head'])}")
    print(f"Errors:                {len(results['error'])}")

    if args.dry_run:
        print("\nDry run complete. No files were modified. Re-run without --dry-run to apply changes.")

    sys.exit(1 if results["error"] else 0)


if __name__ == "__main__":
    main()
