import json
import os
import pandas as pd

data = pd.read_excel(f'./scores.xlsx')
result = {}
for index, row in data.iterrows():
    model_result = {}
    model_result["Model"] = row['model']
    model_result["Source"] = row['Source']
    model_result["Avg."] = row["Avg."]
    model_result["T.I"] = row["T.I"]
    model_result["T.M"] = row["T.M"]
    model_result["S.T"] = row["S.T"]
    model_result["S.J"] = row["S.J"]
    model_result["R.O"] = row["R.O"]
    model_result["R.A"] = row["R.A"]
    model_result["F.S"] = row["F.S"]
    model_result["F.B"] = row["F.B"]
    model_result["P.A"] = row["P.A"]
    model_result["P.L"] = row["P.L"]
    
    result[str(index+1)] = model_result
    
# rename the top 3 models by adding 🥇, 🥈, and 🥉, respectively
result['1']['Model'] = result['1']['Model'] + '🥇'
result['2']['Model'] = result['2']['Model'] + '🥈'
result['3']['Model'] = result['3']['Model'] + '🥉'

# print to file
with open('model_scores.js', 'w') as f:
    f.write("score_table = " + json.dumps(result, indent=2))

