"""Deterministic publication. Never fetch rates or advance verification dates."""
from pathlib import Path
import subprocess
ROOT=Path(__file__).resolve().parents[1]
STEPS=[('python','build_us_articles.py'),('python','build_global_articles.py'),('python','build_site_documents.py'),('python','build_root_guides.py'),('node','build_us_tools.cjs'),('node','build_canada_tools.cjs'),('node','build_country_tools.cjs'),('python','repair_resource_links.py'),('python','repair_hub_faqs.py'),('python','repair_legacy_displays.py'),('node','publish_tool_content.cjs'),('python','publish_editorial_policy.py'),('node','build_homepage_example.cjs'),('python','apply_site_privacy.py'),('node','build_rate_assets.cjs')]
if __name__=='__main__':
 for runtime,script in STEPS:subprocess.run([runtime,str(ROOT/'scripts'/script)],cwd=ROOT,check=True)
