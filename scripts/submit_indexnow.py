#!/usr/bin/env python3
"""
submit_indexnow.py — Production IndexNow URL submission script for Mortgage Pro Global.
Submits added, updated, redirected, or deleted URLs to https://api.indexnow.org/indexnow.
"""

import argparse
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse

import requests

HOST = "mortgageproglobal.com"
KEY = "90248fba878891f4c5576dcd43220182"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
ENDPOINT = "https://api.indexnow.org/indexnow"
SITEMAP_PATH = Path("sitemap.xml")


def read_sitemap_urls() -> list[str]:
    if not SITEMAP_PATH.exists():
        raise FileNotFoundError(f"Missing sitemap: {SITEMAP_PATH}")

    root = ET.parse(SITEMAP_PATH).getroot()
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

    urls: list[str] = []

    for element in root.findall("sm:url/sm:loc", namespace):
        if not element.text:
            continue

        url = element.text.strip()
        parsed = urlparse(url)

        if parsed.scheme != "https":
            print(f"Skipping non-HTTPS URL: {url}", file=sys.stderr)
            continue

        if parsed.hostname != HOST:
            print(f"Skipping foreign host: {url}", file=sys.stderr)
            continue

        urls.append(url)

    # Preserve order while removing duplicates
    return list(dict.fromkeys(urls))


def submit_urls(urls: list[str]) -> None:
    if not urls:
        raise ValueError("No valid URLs found for submission.")

    if len(urls) > 10_000:
        raise ValueError("IndexNow permits at most 10,000 URLs per request.")

    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }

    response = requests.post(
        ENDPOINT,
        json=payload,
        headers={"Content-Type": "application/json; charset=utf-8"},
        timeout=30,
    )

    if response.status_code in (200, 202):
        print(
            f"IndexNow accepted {len(urls)} URL(s). "
            f"HTTP {response.status_code}"
        )
        return

    details = response.text.strip() or "No response body"

    raise RuntimeError(
        f"IndexNow submission failed: "
        f"HTTP {response.status_code}: {details}"
    )


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Submit Mortgage Pro Global URLs to IndexNow."
    )

    parser.add_argument(
        "--url",
        help="Submit one specific canonical Mortgage Pro Global URL.",
    )

    arguments = parser.parse_args()

    if arguments.url:
        parsed = urlparse(arguments.url)

        if parsed.scheme != "https" or parsed.hostname != HOST:
            print(
                f"URL must use https://{HOST}",
                file=sys.stderr,
            )
            sys.exit(1)

        urls = [arguments.url]
    else:
        urls = read_sitemap_urls()

    print(f"Submitting {len(urls)} URL(s) to IndexNow ({ENDPOINT})...")
    submit_urls(urls)


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"Error: {error}", file=sys.stderr)
        sys.exit(1)
