import json
def save_file(dict, path):
    with open(path + ".json", "w+") as outfile:
        json.dump(dict, outfile)

def filter_unicode(text):
    return text.replace("      ", "").replace("\n", "").replace("\u2019", "'").replace("\u2018", "'").replace("\u201c", '"').replace("\u201d", '"').replace("\u2013", "-").replace("\u2026", "...").replace(r"\"", "").replace("\u2014", "-").replace("\u203a", "").replace("\u00a0", "")