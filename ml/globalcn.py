import requests
from bs4 import BeautifulSoup
from ml_utils import filter_unicode, save_file
from pyppeteer import launch


async def scrape_globalcn(debug=False, save=True):
    browser = await launch()
    act_headlines = []
    urls = [
        "https://www.globaltimes.cn/opinion/index.html",
        "https://www.globaltimes.cn/china/diplomacy/index.html",
        "https://www.globaltimes.cn/china/military/index.html",
        "https://www.globaltimes.cn/china/politics/index.html",
        "https://www.globaltimes.cn/world/index.html",
        "https://www.globaltimes.cn/china/society/index.html"
    ]
    for f in urls:
        response = requests.get(f)
        html_content = response.content
        soup = BeautifulSoup(html_content, 'html.parser')

        # A bit weird now
        headlines = soup.find_all("a", "new_title_ml")
        headlines2 = soup.find_all("a", "new_title_ms")
        headlines3 = soup.find_all("a", "new_title_ss")
        f_headlines = [*set(headlines + headlines2 + headlines3)]
        for j in range(0, len(f_headlines)):
            act_headlines.append(f_headlines[j].get("href"))

    a_headlines = [*set(act_headlines)]
    print("TOTAL : ", len(a_headlines))

    # Our return object
    return_obj = {}
    for l in a_headlines:
        # scrape
        response2 = requests.get(l)
        html_content2 = response2.content
        soup2 = BeautifulSoup(html_content2, 'html.parser')

        # Headline
        h = soup2.find("div", "article_title")
        headline = ""
        if h == None:
            continue
        else:
            headline = h.contents[0]
            print(headline)

        # Time
        time = ""
        try:
           time = soup2.find("span", "pub_time").text.replace("Published: ", "")
        except:
            time = ""

        # Image
        image = ""
        try:
            image = soup2.find("center").find("img").get("src")
        except:
            image = ""

        # Paragraphs
        para = soup2.find("div", "article_right")
        txt = ""
        try:
            txt = filter_unicode(para.text).split('.')
        except:
            txt = ""

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

    if save == True:
        save_file(return_obj, "globalcn")
