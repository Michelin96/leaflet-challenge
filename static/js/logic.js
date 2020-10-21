// Create the map object
let myMap = L.map("map", {
    center: [14.23, -51.92],
    zoom: 2
  });

// Make a title layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each quake a different radius based on its magnitude
function markerSize(population) {
    return population / 40;
  }
  

// Make an array of quake data objects

// Loop through the quake data array and create one marker for each location, bind a popup containing its name, magnitude and depth add it to the map
for (let i = 0; i < cities.length; i++) {
    let city = cities[i];
    L.marker(city.location)
      .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>")
      .addTo(myMap);
  }

  // Make a circle marker for each quake
  L.circle([45.52, -122.69], {
    color: "green", // quake depth
    fillColor: "green",
    fillOpacity: 0.75,
    radius: 500 // quake magnitude
  }).addTo(myMap);

// Make the Quake marker layer
let quakeLocal = L.marker([45.52, -122.67], {
  }).addTo(myMap);

// Make the legend

// Make the popup
quakeLocal.bindPopup("Location: <br>Magnitude: <br>Depth:");


// Load the json data for the last 7 days
