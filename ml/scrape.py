import requests
import json
from bs4 import BeautifulSoup
from cnn_politics import scrape_cnn_politics
from cnn_africa import scrape_cnn_africa
from cnn_americas import scrape_cnn_americas
from cnn_australia import scrape_cnn_australia
from cnn_china import scrape_cnn_china
from cnn_europe import scrape_cnn_europe
from cnn_india import scrape_cnn_india
from cnn_middle_east import scrape_cnn_middle_east
from cnn_uk import scrape_cnn_uk

def save_file(dict, path):
    with open(path + ".json", "w+") as outfile:
        json.dump(dict, outfile)

def filter_unicode(text):
    return text.replace("      ", "").replace("\n", "").replace("\u2019", "'").replace("\u2018", "'").replace("\u201c", '"').replace("\u201d", '"').replace("\u2013", "-").replace("\u2026", "...").replace(r"\"", "").replace("\u2014", "-")

save_file(scrape_cnn_india(True), "cnn-india")
save_file(scrape_cnn_africa(True), "cnn-africa")
save_file(scrape_cnn_americas(True), "cnn-americas")
save_file(scrape_cnn_australia(True), "cnn-australia")
save_file(scrape_cnn_china(True), "cnn-china")
save_file(scrape_cnn_europe(True), "cnn-europe")
save_file(scrape_cnn_middle_east(True), "cnn-middle_east")
save_file(scrape_cnn_uk(True), "cnn-uk")
save_file(scrape_cnn_politics(True), "cnn-politics")