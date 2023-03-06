# imports required libraries
import requests  # for sending HTTP requests
from bs4 import BeautifulSoup  # web scraping library
from ml_utils import filter_unicode, save_file  # additional utility functions
from pyppeteer import launch # Headless Browsers automated tool


async def scrape_rt(debug=False, save=True):
    browser = await launch()
    # Page urls to scrape
    urls = [
        "https://www.rt.com/russia/",
        "https://www.rt.com/tags/analysis/",
        "https://www.rt.com/news/",
        "https://www.rt.com/business/",
        "https://www.rt.com/india/",
        "https://www.rt.com/africa/",
        "https://www.rt.com/tags/feature/",
        "https://www.rt.com/tags/op-ed/",
    ]

    act_headlines = []

    # scarpes each page fetch its headlines
    for f in urls:
        # sends GET request to each url and receives response object
        response = requests.get(f)
        html_content = response.content

        # soup object is created which contains raw html data
        soup = BeautifulSoup(html_content, 'html.parser')

        # fetching all article headline elements
        headlines = soup.find_all("a", "link")
        for x in headlines:
            act_headlines.append(x.get("href"))

        # removing duplicate headlines using set() and saving remaining headlines

    # removing duplicates from `act_headlines`
    a_headlines = [*set(act_headlines)]

    # prints length of unique links to scrape on console
    print("TOTAL : ", len(a_headlines))

    # return object
    return_obj = {}

    # iterates through each link
    for l in a_headlines:
        # sends GET request to each link to get details of corresponding article
        page2 = await browser.newPage()
        await page2.goto("https://www.rt.com" + l)
        html2 = await page2.content()
        soup2 = BeautifulSoup(html2, 'html.parser')
        await page2.close()

        h = soup2.find("h1", "article__heading")
        headline = ""
        if h == None:
            continue
        else:
            # saves the `headline` string of the article
            headline = h.text

        time = ""
        try:
            # saves the `time` of publishing of the article
            time = soup2.find("span", "date_article-header").text
        except:
            time = ""

        # saves image link of article
        image = ""
        try:
            image = soup2.find_all("picture")[0].find_all("img")[0].get("src")
        except:
            image = ""

        paras = soup2.find("div", "article__text").find_all("p")
        texts = []
        for falafel in paras:
            texts.append(filter_unicode(falafel.text))

        # Making an `dict-object` containing details of each article.
        return_obj[l] = {
            "paras": texts,
            "headline": filter_unicode(headline),
            "timestamp": time,
            "act": l,
            "image": image,
        }
        if debug == True:
            print("ARTICLE :", filter_unicode(headline),
                  "; PARAS :", len(texts), "; IMAGE :", image, "; TIME :", time)

    # Save scrape results into file with name `globalcn.csv` (CSV format)
    if save == True:
        save_file(return_obj, "rt")

    browser.close()
