# imports required libraries
import requests  # for sending HTTP requests
from bs4 import BeautifulSoup  # web scraping library
from ml_utils import filter_unicode, save_file  # additional utility functions
from pyppeteer import launch # Headless Browsers automated tool

async def scrape_vox(debug=False, save=True):
    browser = await launch()
    # Page urls to scrape
    urls = [
        "https://www.vox.com/politics",
        "https://www.vox.com/policy",
        "https://www.vox.com/climate",
        "https://www.vox.com/technology",
        "https://www.vox.com/russia-invasion-ukraine",
        "https://www.vox.com/china",
        "https://www.vox.com/science",
    ]

    act_headlines = []

    # scarpes each page fetch its headlines
    for f in urls:
        # sends GET request to each url and receives response object
        page = await browser.newPage()
        await page.goto(f)
        html = await page.content()
        soup = BeautifulSoup(html, 'html.parser')
        await page.close()

        # fetching all article headline elements
        headlines = soup.find_all("h3", "c-entry-box-base__headline")
        headlines2 = soup.find_all("h2", "c-entry-box--compact__title")
        for x in headlines:
            act_headlines.append(x.find("a").get("href"))
        for y in headlines2:
            act_headlines.append(y.find("a").get("href"))

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
        await page2.goto(l)
        html2 = await page2.content()
        soup2 = BeautifulSoup(html2, 'html.parser')
        await page2.close()

        h = soup2.find("h1", "c-page-title")
        headline = ""
        if h == None:
            continue
        else:
            # saves the `headline` string of the article
            headline = h.text

        time = ""
        try:
            # saves the `time` of publishing of the article
            time = soup2.find("time", "c-byline__item").text
        except:
            time = ""

        # saves image link of article
        image = ""
        try:
            image = soup2.find_all("picture", "c-picture")[0].find_all("img")[0].get("src")
        except:
            image = ""

        paras = soup2.find("div", "c-entry-content").find_all("p")
        texts = []
        for falafel in paras:
            buf = ""
            buf += filter_unicode(falafel.text)
            for f in falafel.find_all():
                if f.name == "em" or f.name == "a" or f.name == "strong" or f.name == "b":
                    buf += "" + filter_unicode(falafel.text)

            texts.append(buf)

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
        save_file(return_obj, "vox")

    await browser.close()