from bs4 import BeautifulSoup
from ml_utils import filter_unicode, save_file
from pyppeteer import launch

async def scrape_ac_culture(debug=False, save=True):
    browser = await launch()
    page = await browser.newPage()
    await page.goto("https://www.theamericanconservative.com/category/culture/")
    html_content = await page.content()
    await page.close()

    # Create a BeautifulSoup object with the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find all the headlines on the page
    headlines = soup.find_all("h3", "o-post-card__title")
    for h in range(0, len(headlines)):
        for c in headlines[h].find_all("a"):
            headlines[h] = c.get("href")

    headlines = [*set(headlines)]
    if debug:
        print("TOTAL ITEMS", len(headlines))

    # our return object
    return_obj = {}
    for l in headlines:
        t = l

        # scrape
        page2 = await browser.newPage()
        await page2.goto(l)
        html = await page2.content()
        soup2 = BeautifulSoup(html, 'html.parser')
        await page2.close()

        # Headline
        h = soup2.find("h2", "c-hero-article__title")
        head = ""
        if h == None:
            head = "PASTA"
        else:
            head = h.text

        # Paragraphs (this time a bit different)
        article = soup2.find("div", "c-blog-post__content").findChildren()
        textual_content = []
        for k in article:
            if k.name == "p" or k.name == "em" or k.name == "i" or k.name == "b" or k.name == "strong":
                if k.has_attr("class"):
                    if k["class"]:
                        classes = k["class"]
                        if "has-drop-cap" in classes:
                            textual_content.append(filter_unicode(k.text))
                        else:
                            continue
                else:
                    textual_content.append(filter_unicode(k.text))
            else:
                continue

        return_obj[t] = {
            "paras": textual_content,
            "headline": filter_unicode(head),
            "timestamp": "",
            "act": t
        }

        if debug == True:
            print("ARTICLE : ", filter_unicode(head),
                  "; PARAS : ", len(textual_content))

    if save:
        save_file(return_obj, "american-conservative-culture")
    return return_obj
