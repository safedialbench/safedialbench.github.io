import json
import os
import pandas as pd

data = pd.read_excel(f'./scores.xlsx')
result = {}
for index, row in data.iterrows():
    model_result = {}
    model_result["Model"] = row["Model"]
    model_result["Source"] = row["Source"]
    model_result["Avg."] = row["Avg."]
    model_result["A.I"] = row["A.I"]
    model_result["A.H"] = row["A.H"]
    model_result["A.C"] = row["A.C"]
    model_result["E.I"] = row["E.I"]
    model_result["E.H"] = row["E.H"]
    model_result["E.C"] = row["E.C"]
    model_result["F.I"] = row["F.I"]
    model_result["F.H"] = row["F.H"]
    model_result["F.C"] = row["F.C"]
    model_result["L.I"] = row["L.I"]
    model_result["L.H"] = row["L.H"]
    model_result["L.C"] = row["L.C"]
    model_result["M.I"] = row["M.I"]
    model_result["M.H"] = row["M.H"]
    model_result["M.C"] = row["M.C"]
    model_result["P.I"] = row["P.I"]
    model_result["P.H"] = row["P.H"]
    model_result["P.C"] = row["P.C"]
    
    result[str(index+1)] = model_result
    
# rename the top 3 models by adding 🥇, 🥈, and 🥉, respectively
result['1']['Model'] = result['1']['Model'] + '🥇'
result['2']['Model'] = result['2']['Model'] + '🥈'
result['3']['Model'] = result['3']['Model'] + '🥉'

# print to file
with open('model_scores.js', 'w') as f:
    f.write("score_table = " + json.dumps(result, indent=2))

