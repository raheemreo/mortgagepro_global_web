#!/usr/bin/env python3
"""
add_consent_default.py

Injects the Google Consent Mode v2 default block into the gtag snippet
of all production HTML files, skipping files that already have it.
"""

import argparse
import os
import re
import sys

ADSENSE_CONSENT_BLOCK = """gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'region': ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH'],
  'wait_for_update': 500
});"""

EXCLUDED_DIR_NAMES = {
    "components",
    "Designs",
    "designs",
    ".git",
    "node_modules",
    "dist",
    "build",
}

GTAG_JS_RE = re.compile(r"([ \t]*)gtag\s*\(\s*['\"]js['\"]\s*,\s*new\s+Date\s*\(\s*\)\s*\)\s*;")
EXISTING_CONSENT_RE = re.compile(r"gtag\s*\(\s*['\"]consent['\"]\s*,\s*['\"]default['\"]", re.IGNORECASE)


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


def process_file(path, dry_run, backup):
    try:
        text, newline = read_file_preserve_newline(path)
    except Exception as e:
        return ("error", str(e))

    if EXISTING_CONSENT_RE.search(text):
        return ("already_present", None)

    match = GTAG_JS_RE.search(text)
    if not match:
        return ("no_gtag", None)

    indent = match.group(1)
    block_lines = [indent + line if line else "" for line in ADSENSE_CONSENT_BLOCK.split("\n")]
    formatted_block = "\n".join(block_lines) + "\n"

    new_text = text[:match.start()] + formatted_block + text[match.start():]

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
    parser = argparse.ArgumentParser(description="Inject Google Consent Mode v2 default config.")
    parser.add_argument("--root", default=".", help="Root directory to scan")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without writing")
    parser.add_argument("--backup", action="store_true", help="Write a .bak copy first")
    args = parser.parse_args()

    root = os.path.abspath(args.root)
    if not os.path.isdir(root):
        print(f"Error: root path does not exist: {root}")
        sys.exit(1)

    html_files = find_html_files(root)

    results = {
        "modified": [],
        "already_present": [],
        "no_gtag": [],
        "error": [],
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

    if results["already_present"]:
        print("Already had consent block (skipped):")
        for rel, _ in results["already_present"]:
            print(f"  - {rel}")
        print()

    if results["no_gtag"]:
        print("Skipped (no gtag('js') found):")
        for rel, _ in results["no_gtag"]:
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
    print(f"Skipped (no gtag):    {len(results['no_gtag'])}")
    print(f"Errors:                {len(results['error'])}")

    sys.exit(1 if results["error"] else 0)


if __name__ == "__main__":
    main()
