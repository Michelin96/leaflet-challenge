 // Create the map object
 let myMap = L.map("map", {
    center: [14.23, -51.92],
    zoom: 2
});

// Make a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/light-v10",
accessToken: API_KEY
}).addTo(myMap);

let quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"


// Perform a GET request to the query URL
d3.json(quakeUrl).then(data => {
  console.log(data);
 // Create a new choropleth layer
 let geojson = L.choropleth(data, {

  // Define what  property in the features to use
  valueProperty: "MHI2016",

  // Set color scale
  scale: ["#ffffb2", "#b10026"],

  // Number of breaks in step range
  steps: 10,

  // q for quartile, e for equidistant, k for k-means
  mode: "q",
  style: {
    // Border color
    color: "#fff",
    weight: 1,
    fillOpacity: 0.8
  },

  // Binding a pop-up to each layer
  onEachFeature: function(feature, layer) {
    layer.bindPopup(`Location: ${feature.properties.place}<br>Magnitude: ${feature.properties.mag} <br>Depth: ${feature.geometry.coordinates[2]} km`);
  }
}).addTo(myMap);

// Set up the legend
var legend = L.control({ position: "bottomleft" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var limits = geojson.options.limits;
  var colors = geojson.options.colors;
  var labels = [];

  // Add min & max
  var legendInfo = `<h1>Earthquake Depth (km)</h1>
    <div class="labels">
      <div class="min"> ${limits[0].toLocaleString(undefined,{style:'currency',currency:'USD',maximumSignificantDigits: 3})} </div>
      <div class="max"> ${limits[limits.length - 1].toLocaleString(undefined,{style:'currency',currency:'USD',maximumSignificantDigits: 4})} </div>
    </div>`;

  div.innerHTML = legendInfo;

  limits.forEach(function(limit, index) {
    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  });

  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};

// Adding legend to the map
legend.addTo(myMap);

});