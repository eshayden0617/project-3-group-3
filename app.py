# 1. Import Flask
from flask import Flask, render_template, jsonify
import pandas as pd

# 2. Create an app
app = Flask(__name__)

# 3. Connection to CSV
try:
    df = pd.read_csv('data/worldpopulation.csv')
except FileNotFoundError:
    print("CSV file not found")

# 4. Define html routes
@app.route("/")
def index():
    return render_template("index.html")

# 5. App route for animated map
@app.route("/Density(2022)")
def density_2022():
    # Convert DataFrame to JSON
    specific_columns = df[['Country', 'Density(2022)']]
    animatedMapData = specific_columns.to_dict(orient='records')
    return jsonify(animatedMapData)

# 6. App route for poppulation map
@app.route("/Population")
def populationMap():
    specific_columns = df[['Country', '2022']]
    populationMapData = specific_columns.to_dict(orient='records')
    return jsonify(populationMapData)

# 4. App route for bar chart
@app.route("/Country")
def yearsbyCountry():
    specific_columns = df[['Country', '1970', '1980', '1990', '2000', '2010', '2015', '2020', '2022']]
    countryBarChart = specific_columns.to_dict(orient='records')
    return jsonify(countryBarChart)

if __name__ == "__main__":
    app.run(port=8000, debug=True)
