import csv
import os
import xml.etree.ElementTree as ET

def extract_urls_from_sitemap(xml_file):
    urls = []
    try:
        tree = ET.parse(xml_file)
        root = tree.getroot()
        for child in root:
            if child.tag.endswith('url'):
                for item in child:
                    if item.tag.endswith('loc'):
                        urls.append(item.text.strip())
    except Exception as e:
        print(f"Error processing {xml_file}: {e}")
    return urls

def extract_urls_from_sitemaps(sitemap_files):
    all_urls = []
    for file in sitemap_files:
        if os.path.isfile(file) and file.endswith('.xml'):
            urls = extract_urls_from_sitemap(file)
            all_urls.extend(urls)
    return all_urls

def save_urls_to_csv(urls, csv_file):
    try:
        with open(csv_file, 'w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(['URL'])
            for url in urls:
                writer.writerow([url])
        print(f"URLs saved to {csv_file}")
    except Exception as e:
        print(f"Error saving URLs to {csv_file}: {e}")

# List of XML sitemap files
sitemap_files = [
    "sitemaps/energy-management-and-power-quality-sitemap.xml",
    "sitemaps/industrial-control-and-automation-power-supplies-and-transformers-sitemap.xml",
    "sitemaps/power-distribution-and-protection-power-supplies-and-transformers-sitemap.xml",
    "sitemaps/power-distribution-and-protection-termination-and-wiring-system-sitemap.xml",
]

# Extract URLs from sitemap files
all_urls = extract_urls_from_sitemaps(sitemap_files)

# Save URLs to CSV file
csv_file = "extracted_urls.csv"
save_urls_to_csv(all_urls, csv_file)
