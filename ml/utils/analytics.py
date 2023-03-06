import json
import matplotlib.pyplot as plt
from wordcloud import WordCloud

# Get the most used word in media
FILE = r"D:\Projects\v2\apps\ponder\alternet-politics.json"

# String to send into wordcharm
JS = json.load(open(FILE, "r+"))
keys = JS.keys()
str = ""
for key in keys:
    things = JS[key]["paras"]
    for k in things:
        str += k
        str += " "

word_cloud2 = WordCloud(collocations = False, background_color = 'white').generate(str)
plt.imshow(word_cloud2, interpolation='bilinear')
plt.axis("off")
plt.show()