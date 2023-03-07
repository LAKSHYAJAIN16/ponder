import json 

# Two Files
FILE_1 = json.load(open(r"D:\Projects\v2\apps\ponder\globalcn.json", "r+"))
FILE_2 = json.load(open(r"D:\Projects\v2\apps\ponder\american-conservative-fa.json", "r+"))

# Get Keys
FILE_1_KEYS = FILE_1.keys()
FILE_2_KEYS = FILE_2.keys()

CONTENT_1 = []
for key1 in FILE_1_KEYS:
    content = FILE_1[key1]
    string = ""
    for para in content["paras"]:
        string += para
    CONTENT_1.append({"content" : string, "title" : content["headline"]})

buf = CONTENT_1[3]["content"]
buf2 = CONTENT_1[4]["content"]
search_str = "I will give you two article, separated by tildas. Are both of them on the same topic? Do both of them have opposite views?"
final = search_str + r"'" + buf + r"'  ~  '" + buf2 + r"'"
print(final)