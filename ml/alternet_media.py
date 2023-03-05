import requests
from bs4 import BeautifulSoup
from ml_utils import filter_unicode, save_file
from pyppeteer import launch

async def scrape_alternet_media(debug=False, save=True):    
    browser = await launch()
    # Set the URL of the CNN archive page for February 7th, 2023
    url = "https://www.alternet.org/media/"
    
    # Send a request to the archive page and get the HTML content
    response = requests.get(url)
    html_content = response.content
    
    # Create a BeautifulSoup object with the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Find all the headlines on the page
    headlines = soup.find_all("a", "widget__headline-text")
    for m in range(0, len(headlines)):
        headlines[m] = headlines[m].get("href")

    headlines = [*set(headlines)]
    print(headlines)
    
    # Our return object
    return_obj = {}
    for l in headlines:
        # Get the link
        link = l
    
        # scrape
        page2 = await browser.newPage()
        await page2.goto(link)
        html = await page2.content()
        soup2 = BeautifulSoup(html, 'html.parser')
        await page2.close()
    
        # Headline
        h = soup2.find("h1", "headline")
        headline = ""
        if h == None:
            continue
        else:
            headline = h.text
    
        # Paragraphs
        para = soup2.find("div", "body-description").find_all()
        texts = []
        for x in para:
            if x.name == "p" or x.name == "a":
                texts.append(filter_unicode(x.text))
            else:
                continue
    
        return_obj[link] = {
            "paras": texts,
            "headline": filter_unicode(headline),
            "timestamp": "NA",
            "act": link
        }
        if debug == True:
            print("ARTICLE : ", filter_unicode(headline), "; PARAS : ", len(texts))

    if save == True:
        save_file(return_obj, "alternet-media")