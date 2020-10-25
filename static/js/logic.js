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
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);

  let legend = L.control({position: 'bottomright'});

  legend.onAdd = function (myMap) {

      let div = L.DomUtil.create('div', 'info legend'),
          kmDepth = [0, 10, 50, 100, 200],
          colors = ['yellow','gold', 'orange', 'red', 'maroon'],
          labels = [];

      // loop through depth intervals and generate a label with a colored square for each interval
      for (let i = 0; i < kmDepth.length; i++) {
          div.innerHTML +=
              '<i style=\"background:' + colors[i] + '"></i> ' +
              kmDepth[i] + (kmDepth[i + 1] ? '&ndash;' + kmDepth[i + 1] + '<br>' : '+');
      }

      return div;
  };

  legend.addTo(myMap);
 
});

function createFeatures(earthquakeData) {

  // Give each feature a popup describing the location, magnitude, and depth of the earthquake
  function onEachFeature(feature, layer) {

    layer.bindPopup(`Location: ${feature.properties.place}<br>Magnitude: ${feature.properties.mag} <br>Depth: ${feature.geometry.coordinates[2]} km`)
    .addTo(myMap);
  }
  
  L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: (feature, latlng) => {
      return new L.Circle(latlng, {
        radius: Math.sqrt(feature.properties.mag)*150000,
        fillColor: feature.geometry.coordinates[2] > 200 ? 'maroon': feature.geometry.coordinates[2] > 100 ? 'red': feature.geometry.coordinates[2] > 50 ? 'orange':'yellow',
        stroke: false 
      });
    }
  });
  
}

