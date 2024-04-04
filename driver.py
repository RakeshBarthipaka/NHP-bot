import os
import pandas as pd
from bs4 import BeautifulSoup
from tqdm import tqdm
import time
from selenium import webdriver

def get_text(link):
    try:
        driver = webdriver.Chrome()
        driver.get(link)
        time.sleep(5)
        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        driver.quit()
        return soup.text
    except Exception as e:
        print(f"EXCEPTION AT {link} - {e}")
        return "Error"

# Check if the file exists and is non-empty
if os.path.isfile('data/extracted_data.csv') and os.path.getsize('data/extracted_data.csv') > 0:
    # Read existing data from CSV file
    existing_data = pd.read_csv('data/extracted_data.csv')
else:
    existing_data = pd.DataFrame(columns=['URL', 'Text Content'])
    existing_data.to_csv('data/extracted_data.csv', index=False)  # Create the file if it doesn't exist

# Read URLs from CSV file if it exists
if os.path.isfile('urls_without_duplicates.csv') and os.path.getsize('urls_without_duplicates.csv') > 0:
    df = pd.read_csv("urls_without_duplicates.csv")
    urls = df['URL'].tolist()
else:
    urls = []

# Process URLs from 0 to 10
urls_to_process = urls[800:902]

# Extract text content for new ULs only
data = []
for url in tqdm(urls_to_process):
    if url not in existing_data['URL'].tolist():  # Check if URL is already in existing data
        text_content = get_text(url)
        data.append({'URL': url, 'Text Content': text_content})

# Create DataFrame for new data and append to existing data
new_data = pd.DataFrame(data)
combined_data = pd.concat([existing_data, new_data], ignore_index=True)

# Save new data to CSV file
combined_data.to_csv('extracted_data.csv', index=False)
print("New data appended to extracted_data.csv")
