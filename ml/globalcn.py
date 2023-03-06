# imports required libraries
import requests # for sending HTTP requests
from bs4 import BeautifulSoup # web scraping library
from ml_utils import filter_unicode, save_file # additional utility functions

# launches the browswer
async def scrape_globalcn(debug=False, save=True):
    # Page urls to scrape
    urls = [
        "https://www.globaltimes.cn/opinion/index.html",
        "https://www.globaltimes.cn/china/diplomacy/index.html",
        "https://www.globaltimes.cn/china/military/index.html",
        "https://www.globaltimes.cn/china/politics/index.html",
        "https://www.globaltimes.cn/world/index.html",
        "https://www.globaltimes.cn/china/society/index.html"
    ]

    act_headlines = []

    # scarpes each page fetch its headlines 
    for f in urls:
        # sends GET request to each url and receives response object
        response = requests.get(f)
        html_content = response.content
        
        #soup object is created which contains raw html data
        soup = BeautifulSoup(html_content, 'html.parser')

        # fetching all article headline elements
        headlines = soup.find_all("a", "new_title_ml")
        headlines2 = soup.find_all("a", "new_title_ms")
        headlines3 = soup.find_all("a", "new_title_ss")

        # removing duplicate headlines using set() and saving remaining headlines
        f_headlines = [*set(headlines + headlines2 + headlines3)]
        
        for j in range(0, len(f_headlines)):
            #appending fetched links into `act_headlines` list-variable
            act_headlines.append(f_headlines[j].get("href"))

    # removing duplicates from `act_headlines`
    a_headlines = [*set(act_headlines)]
    
    # prints length of unique links to scrape on console
    print("TOTAL : ", len(a_headlines))

    # return object
    return_obj = {}
    
    # iterates through each link
    for l in a_headlines:
        # sends GET request to each link to get details of corresponding article
        response2 = requests.get(l)
        html_content2 = response2.content
        
        soup2 = BeautifulSoup(html_content2, 'html.parser')

        h = soup2.find("div", "article_title")
        headline = ""
        if h == None:
            continue
        else:
            # saves the `headline` string of the article
            headline = h.contents[0]
            print(headline)

        time = ""
        try:
            # saves the `time` of publishing of the article
           time = soup2.find("span", "pub_time").text.replace("Published: ", "")
        except:
            time = ""

        image = ""
        try:
            # saves image link of article
            image = soup2.find("center").find("img").get("src")
        except:
            image = ""

        para = soup2.find("div", "article_right")
        txt = ""
        try:
            #saves `mainparagraphs` content of the article after filtering non-unicode characters and spliting it into list of sentences by dot(`.`) symbol
            txt = filter_unicode(para.text).split('.')
        except:
            txt = ""

        # Making an `dict-object` containing details of each article.
        return_obj[l] = {
            "paras": txt,
            "headline": filter_unicode(headline),
            "timestamp": time,
            "act": l,
            "image" : image,
        }
        if debug == True:
            print("ARTICLE :", filter_unicode(headline),
                  "; PARAS :", len(txt), "; IMAGE :", image, "; TIME :", time)
    
    #Save scrape results into file with name `globalcn.csv` (CSV format)
    if save == True:
        save_file(return_obj, "globalcn")
