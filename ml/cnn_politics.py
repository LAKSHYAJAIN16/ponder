import requests
from bs4 import BeautifulSoup
from ml_utils import filter_unicode

def scrape_cnn_politics(debug=False):    
    # Set the URL of the CNN archive page for February 7th, 2023
    url = "https://www.edition.cnn.com/politics"
    
    # Send a request to the archive page and get the HTML content
    response = requests.get(url)
    html_content = response.content
    
    # Create a BeautifulSoup object with the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Find all the headlines on the page
    headlines = soup.find_all("a", "container__link")
    
    # our return object
    return_obj = {}
    for l in headlines:
        # Get the link
        link = l.get("href")
    
        # scrape
        response2 = requests.get("https://edition.cnn.com" + link)
        soup2 = BeautifulSoup(response2.content, 'html.parser')
    
        # Headline
        h = soup2.find("h1", "headline__text")
        headline = ""
        if h == None:
            continue
        else:
            headline = h.text
    
        # Paragraphs
        paras = soup2.find_all("p", "paragraph")
        paras2 = soup2.find_all("div", "Paragraph__component")
        texts = []
        for x in paras:
            texts.append(filter_unicode(x.text))
        for y in paras2:
            texts.append(filter_unicode(y.text))
    
        # Timestamp
        t = soup2.find("div", "timestamp")
        time = ""
        if t == None:
            continue
        else:
            time = t.text
    
        return_obj[link] = {
            "paras": texts,
            "headline": filter_unicode(headline),
            "timestamp": filter_unicode(time),
            "act": link
        }
        if debug == True:
            print("ARTICLE : ", filter_unicode(headline), "; PARAS : ", len(texts))
        
    return return_obj