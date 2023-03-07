# imports required libraries
import requests  # for sending HTTP requests
from bs4 import BeautifulSoup  # web scraping library
from ml_utils import filter_unicode, save_file  # additional utility functions
from pyppeteer import launch # Headless Browsers automated tool

async def scrape_spectator(debug=False, save=True):
    browser = await launch()
    # Page urls to scrape
    urls = [
        "https://spectator.org/",
        "https://spectator.org/category/blog/",
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
        headlines = soup.find_all("div", "title")
        for x in headlines:
            try:
                act_headlines.append(x.find("a").get("href"))
            except:
                # lol exception
                print("lol")

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

        h = soup2.find("div", "title")
        headline = ""
        if h == None:
            continue
        else:
            # saves the `headline` string of the article
            headline = h.contents[0]

        time = ""
        try:
            # saves the `time` of publishing of the article
            time = soup2.find("div", "date").contents[0]
        except:
            time = ""

        # saves image link of article
        image = ""
        try:
            ifa = soup2.find("div", "image-container")
            img_element = ifa.find("div", "image").get("style")
            image = img_element.replace("background-image: url(", "").replace(");", "")
        except:
            image = ""

        paras = soup2.find("div", "paywall").find_all("p")
        texts = []
        for falafel in paras:
            buf = ""
            buf += filter_unicode(falafel.text)
            for f in falafel.find_all():
                if f.name == "em" or f.name == "a" or f.name == "b":
                    buf += "" + filter_unicode(falafel.text)
                elif f.name == "strong":
                    continue

            texts.append(buf)

        # Making an `dict-object` containing details of each article.
        return_obj[l] = {
            "paras": texts,
            "headline": filter_unicode(headline),
            "timestamp": filter_unicode(time),
            "act": l,
            "image": image,
        }
        if debug == True:
            print("ARTICLE :", filter_unicode(headline),
                  "; PARAS :", len(texts), "; IMAGE :", image, "; TIME :", time)

    # Save scrape results into file with name `globalcn.csv` (CSV format)
    if save == True:
        save_file(return_obj, "american_spectator")

    await browser.close()