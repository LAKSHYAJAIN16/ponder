import json
import asyncio
from bs4 import BeautifulSoup
from ml_utils import save_file
from cnn_politics import scrape_cnn_politics
from cnn_africa import scrape_cnn_africa
from cnn_americas import scrape_cnn_americas
from cnn_australia import scrape_cnn_australia
from cnn_china import scrape_cnn_china
from cnn_europe import scrape_cnn_europe
from cnn_india import scrape_cnn_india
from cnn_middle_east import scrape_cnn_middle_east
from cnn_uk import scrape_cnn_uk
from ac_culture import scrape_ac_culture
from ac_foreign_affairs import scrape_ac_foreign_affairs
from ac_politics import scrape_ac_politics
from alternet_pol import scrape_alternet_politics
from alternet_media import scrape_alternet_media
from globalcn import scrape_globalcn
from rt import scrape_rt
from vox import scrape_vox
from american_spectator import scrape_spectator


def alternet():
    asyncio.get_event_loop().run_until_complete(
        scrape_alternet_media(True, True))
    asyncio.get_event_loop().run_until_complete(
        scrape_alternet_politics(True, True))


def cnn():
    save_file(scrape_cnn_india(True), "cnn-india")
    save_file(scrape_cnn_africa(True), "cnn-africa")
    save_file(scrape_cnn_americas(True), "cnn-americas")
    save_file(scrape_cnn_australia(True), "cnn-australia")
    save_file(scrape_cnn_china(True), "cnn-china")
    save_file(scrape_cnn_europe(True), "cnn-europe")
    save_file(scrape_cnn_middle_east(True), "cnn-middle_east")
    save_file(scrape_cnn_uk(True), "cnn-uk")
    save_file(scrape_cnn_politics(True), "cnn-politics")


def american_conservative():
    asyncio.get_event_loop().run_until_complete(scrape_ac_politics(True, True))
    asyncio.get_event_loop().run_until_complete(
        scrape_ac_foreign_affairs(True, True))
    asyncio.get_event_loop().run_until_complete(scrape_ac_culture(True, True))


def globalcn():
    asyncio.get_event_loop().run_until_complete(
        scrape_globalcn(True, True))


def rt():
    asyncio.get_event_loop().run_until_complete(
        scrape_rt(True, True))


def vox():
    asyncio.get_event_loop().run_until_complete(
        scrape_vox(True, True))

def american_spectator():
    asyncio.get_event_loop().run_until_complete(
        scrape_spectator(True, True))
# `alternet()
# cnn()
# american_conservative()
# globalcn()
# rt()
# vox()`
american_spectator()