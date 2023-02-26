import requests
from bs4 import BeautifulSoup
from ml_utils import filter_unicode

def american_conservative(debug=False):    
    # Set the URL of the CNN archive page for February 7th, 2023
    url = "https://www.theamericanconservative.com/"
    
    # Send a request to the archive page and get the HTML content
    response = requests.get(url)
    html_content = response.content
    
    # Create a BeautifulSoup object with the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Find all the headlines on the page
    headlines = soup.find_all("a", "o-post-card__title")
    
    # our return object
    return_obj = {}
    for l in headlines:
        # Get the link
        link = l.get("href")
    
        # scrape
        response2 = requests.get(link)
        soup2 = BeautifulSoup(response2.content, 'html.parser')
    
        # Headline
        h = soup2.find("h2", "c-hero-article__title")
        headline = ""
        if h == None:
            continue
        else:
            headline = h.text
    
        # Paragraphs (this time a bit different)
        article = soup2.find("div", "c-blog-post__content").findChildren()
        for k in article:
            print(k.text)
        # return_obj[link] = {
        #     "paras": texts,
        #     "headline": filter_unicode(headline),
        #     "timestamp": filter_unicode(time),
        #     "act": link
        # }
        # if debug == True:
        #     print("ARTICLE : ", filter_unicode(headline), "; PARAS : ", len(texts))
        
    return return_obj