import requests
from bs4 import BeautifulSoup
from fpdf import FPDF
import time

# Function to scrape a single page and extract text content
def scrape_page(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for 4XX and 5XX status codes
        soup = BeautifulSoup(response.content, 'html.parser')
        # Extract text content
        text_content = soup.get_text(separator='\n')
        return text_content
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")
        return None

# Function to scrape multiple pages and append content to PDF
def scrape_and_append_to_pdf(urls, output_pdf):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
   
    for url in urls:
        text_content = scrape_page(url)
        if text_content:
            pdf.add_page()
            pdf.set_font("Arial", size=12)
            # Encode text content using UTF-8
            pdf.multi_cell(0, 10, text_content.encode('latin-1', 'replace').decode('latin-1'))
        time.sleep(1)  # Add a sleep time of 1 second between requests
 
    pdf.output(output_pdf)

# URLs to scrape
urls = [
    "https://i-venture.org/",
    # Add more URLs here
]

# Output PDF file
output_pdf = "scraped_data.pdf"

# Scrape and append to PDF
scrape_and_append_to_pdf(urls, output_pdf)
