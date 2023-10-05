# Group-3

Project 3: The World Population Change – Data Visualization

Team Members: Caroline Foshee, Eleanor Hayden, Seth Ritter, Sivangi Raychoudhury

PROJECT OBJECTIVE:
The primary goal of this project was to create interactive visualizations in a dashboard, using HTML and Javascript. For this purpose, we chose “The World Population Change” as our topic and aimed for:
•	Creating a drop-down menu containing all the countries which will yield the population change bar chart.
•	Using GeoCharts library in our javascript to show the population density across the world.
•	Creating an animated timestamped world map showing population growth over the years.

STEP 1: Data cleaning and connecting to the database.
To accomplish the goal for this project, we used Kaggel.com to find the dataset of our interest. The link to the page is https://www.kaggle.com/datasets/whenamancodes/world-population-live-dataset?select=World+Population+Live+Dataset.csv 
•	After downloading the csv file, we changed the csv to the SQLite file using SQLite studio.
•	SQLite database was used to house our data.
•	Data was imported using pandas, sqlite3 and other relevant libraries using Jupyter notebook, and it was converted to a pandas dataframe for further cleaning process.
•	We checked for the duplicates, null values, changed the datatypes to the desired datatype, rename the columns, rearrange the columns, organized the country column alphabetically. 
•	Plotted a bar graph showing the global population change over the years from 1970-2022.
•	Plotted 10 most populated countries in a Pie chart. 
•	Imported plotly and country_converter libraries into the jupyter notebook, which converted the country codes into ISO3 format and helped with the plotting of world population density map. 
•	The cleaned dataframe was saved as csv and json formats for further actions. 

STEP 2: Flask
The Python Flask API (app.py), was created at this point to import CSV file(worldpopulation_clean.csv) to allow us to provide a web interface to upload and manage our data and build a web-based tool for data analysis and visualization. It also connects our HTML and the Javascript files. 

STEP 3: HTML
The HTML file (index.html) was coded in a way that it defines the basic structure, content, functionality, and styling of our web page.

STEP 4: Javascript
To achieve our goal of visualizations, javascript was used in Visual Studio Code. 
•	Drop-down menu that contained all the country names and displayed the population growth of that country as a bar chart in the dashboard. For this purpose, plotly was used to get the plots. 
•	A static world map presenting the world population density in 2022. For this GeoCharts library was used and the map displayed the densities of countries from light blue (less dense) to purple (heavily densed).
•	Animated timestamped world map show casing the population change over the period, using plotly. 

STEP 5: Visualizations/ Dashboard
Three unique visualizations were presented, which were multiple user-driven interactive plots and maps in a single dashboard. All the visualizations were displayed in a clear and digestible manner which made it easier to interpret the data story. 

NOTE: To see the dashboard with visuals, we first must get the flask app (app.py) connected and running. 




