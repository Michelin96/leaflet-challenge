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

// Make the Quake marker layer
let quakeLocal = L.marker([45.52, -122.67], {
  }).addTo(myMap);

// Make the legend

// Make the tool tip/popup
quakeLocal.bindPopup("Location: <br>Magnitude: <br>Depth:");


// Load the json data for the last 7 days