////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Population scale changes by year
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Load data from the CSV file
d3.json("/Population").then(function (data) {
    // Extract the years (columns) from the data
    var years = Object.keys(data[0]).slice(2, -4); // Exclude non-year columns
    // Initialize arrays to store map data and slider steps
    var frames = [];
    var sliderSteps = [];
    // Process the data for each year
    years.forEach(function (year) {
      var locations = data.map(function (row) {
        return row["Country"];
      });
      var population = data.map(function (row) {
        return row[year];
      });
      frames.push({
        data: [{ z: population, locations: locations, text: locations }],
        name: year,
      });
      sliderSteps.push({
        label: year.toString(),
        method: "animate",
        args: [
          [year],
          {
            mode: "immediate",
            transition: { duration: 300 },
            frame: { duration: 300 },
          },
        ],
      });
    });
    var initialYear = years[0];
    var data = [
      {
        type: "choropleth",
        locationmode: "country names",
        locations: frames[0].data[0].locations,
        z: frames[0].data[0].z,
        text: frames[0].data[0].locations,
        zauto: false,
        zmin: 0, // Set the minimum value for the color scale
        zmax: Math.max(...frames[0].data[0].z), // Set the maximum value for the color scale based on the data
        colorscale: "Viridis", // Choose a color scale
      },
    ];
    var layout = {
      title: "Population by Country (" + initialYear + ")",
      geo: {
        scope: "world",
        showland: true,
      },
      updatemenus: [
        {
          x: 0.1,
          y: 0,
          yanchor: "top",
          xanchor: "right",
          showactive: false,
          direction: "left",
          type: "buttons",
          pad: { t: 87, r: 10 },
          buttons: [
            {
              method: "animate",
              args: [
                null,
                {
                  fromcurrent: true,
                  transition: {
                    duration: 200,
                  },
                  frame: {
                    duration: 500,
                  },
                },
              ],
              label: "Play",
            },
            {
              method: "animate",
              args: [
                [null],
                {
                  mode: "immediate",
                  transition: {
                    duration: 0,
                  },
                  frame: {
                    duration: 0,
                  },
                },
              ],
              label: "Pause",
            },
          ],
        },
      ],
      sliders: [
        {
          active: 0,
          steps: sliderSteps,
          x: 0.1,
          len: 0.9,
          xanchor: "left",
          y: 0,
          yanchor: "top",
          pad: { t: 50, b: 10 },
          currentvalue: {
            visible: true,
            prefix: "Year: ",
            xanchor: "right",
            font: {
              size: 20,
              color: "#666",
            },
          },
          transition: {
            duration: 300,
            easing: "cubic-in-out",
          },
        },
      ],
    };
    Plotly.newPlot("populationMap", data, layout).then(function () {
      Plotly.addFrames("populationMap", frames);
    });
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Density pops up when you hover over a country 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Load the Google Visualization API
google.charts.load('current', {'packages':['geochart']});

// Set a callback function to run when the Google Visualization API is loaded
google.charts.setOnLoadCallback(drawGeoChart);

function drawGeoChart() {
  // Use d3.json to load and parse the data
  d3.json("/Density").then(function(data) {
    // Create a DataTable and add columns
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn("string", "Country");
    dataTable.addColumn("number", "Density");

    // Iterate through the data and add rows to the DataTable
    data.forEach(function(d) {
      dataTable.addRow([d.Country, parseFloat(d["Density (2022)"])]);
    });

    // Create options for the GeoChart
    var options = {
      title: "Population Density of Countries in 2022",
      colorAxis: {
         minValue: 0,
         maxValue: 500,
         colors: ['lightblue', 'darkblue', 'purple']
        },
      // datalessRegionColor: '#f8f8f8', // Color for countries with no data
    };

    // Create a GeoChart and attach it to the div in our HTML
    var chart = new google.visualization.GeoChart(document.getElementById("geoChart"));

    // Draw the chart with the DataTable and options
    chart.draw(dataTable, options);
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dropdown menu that changes by the country you select with Plotly
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Init function for the dropdown dashboard

function init() {
  // Fetch the data and console log it
  d3.json("/Country").then((data) => {
    // Extract unique country names for the dropdown
    const countryNames = Array.from(new Set(data.map(d => d.Country)));
    console.log(data);

    // Populate the dropdown with country names
    const dropdown = d3.select("#selDataset");
    d3.select("#selDataset").on("change", function() {
        const selectedCountry = d3.select(this).property("value");
        optionChanged(selectedCountry, data);
      });
    countryNames.forEach(country => {
      dropdown.append("option").text(country);
    });

    // Initialize the dashboard with the first country in the list
    optionChanged(countryNames[0], data);
  });
}

function optionChanged(selectedCountry, data) {
  // console.log("Selected Country: ", selectedCountry);

  // Filter data based on the selected country
  const countryData = data.filter(d => d.Country === selectedCountry);
  // console.log("Filtered Data: ", countryData);

  // Extract years and population data
  const years = Object.keys(countryData[0]).filter(key => /^\d{4}$/.test(key));
  const populationData = years.map(year => +countryData[0][year]);


  // Create the bar chart
  barPlot(years, populationData, selectedCountry);
}

// Define a function for the bar plot
function barPlot(years, populationData, selectedCountry) {
  let trace1 = {
    type: "bar",
    x: years,
    y: populationData,
    text: years.map(year => `${selectedCountry} - ${year}`),
    marker: {
      color: 'blue', // You can customize the color
    },
  };

  let dataBar = [trace1];
  let layoutBar = {
    title: `Population of ${selectedCountry} Over the Years`,
    xaxis: { title: "Year" },
    yaxis: { title: "Population" },
    width: 800,
  };

  Plotly.react("bar", dataBar, layoutBar);
}

// console.log("init function called");
init(optionChanged);
