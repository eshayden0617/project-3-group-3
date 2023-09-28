# 1. Import Flask
from flask import Flask, render_template, jsonify
import sqlite3
import pandas as pd

# 2. Create an app
app = Flask(__name__)

# 3. Connection to Database
conn = sqlite3.connect('data/worldpopulation.')
query = 'SELECT * FROM '
df = pd.read_sql(query, conn)
conn.close()

# 4. Define static routes
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/about")
def about():
    name = "Peleke"
    location = "Tien Shan"

    return f"My name is {name}, and I live in {location}."


@app.route("/contact")
def contact():
    email = "peleke@example.com"

    return f"Questions? Comments? Complaints? Shoot an email to {email}."


# 4. Define main behavior
if __name__ == "__main__":
    app.run(debug=True)
