import pandas as pd
import matplotlib as plt
import seaborn as sns

# get data
data = pd.read_json(r"D:\Projects\v3\ponder\algos\data\p.json", lines=True)
print(data)