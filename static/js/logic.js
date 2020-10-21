let quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"

// Perform a GET request to the query URL
d3.json(quakeUrl).then(quakedata => {
    console.log(quakedata);
    createFeatures(quakedata.features);
  });

function createFeatures(quakeData) {

    function onEachFeature(feature, layer) {
        layer.bindPopup(`Location: ${feature.properties.place}<br>Magnitude: ${feature.properties.mag} <br>Depth: ${feature.geometry.coordinates[2]}`);
    }
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    let quakes = L.geoJSON(quakeData, {
        onEachFeature: onEachFeature,
    });

    // let mags = L.geoJSON(quakeData, {
    //     onEachFeature: onEachFeature,
    //     pointToLayer: (feature, latlng) => {
    //       return new L.Circle(latlng, {
    //         radius: feature.properties.mag*20000,
    //         fillColor: "red",
    //         stroke: false 
    //       });
    //     }
    //   });
    
    // Sending our earthquakes layer to the createMap function
    createMap(quakes);
}

function createMap(quakes) {

    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    });
  
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });
  
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Street Map": streetmap,
      "Dark Map": darkmap
    };
  
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Earthquakes: quakes,
    //   Magnitudes: mags
    };
  
    // Create the map object with the default layers
    var myMap = L.map("map", {
      center: [
        14.23, -51.92
      ],
      zoom: 2,
      layers: [streetmap, quakes]
    });
  
    //Add layer control to our baske and layer maps
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  }

// // Create the map object
// let myMap = L.map("map", {
//     center: [14.23, -51.92],
//     zoom: 2
//   });

// // Make a title layer
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// }).addTo(myMap);

// // Define a markerSize function that will give each quake a different radius based on its magnitude
// function markerSize(population) {
//     return Math.sqrt(population)*100;
// }
  

// // Make an array of quake data objects

// // Loop through the quake data array and create one marker for each location, bind a popup containing its name, magnitude and depth add it to the map
// for (let i = 0; i < cities.length; i++) {
//     let city = cities[i];
//     L.marker(city.location)
//       .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>")
//       .addTo(myMap);
//   }


//   // Loop through the cities array and create one marker for each city object
// for (var i = 0; i < cities.length; i++) {
//     L.circle(cities[i].location, {
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: "purple",
//       // Setting our circle's radius equal to the output of our markerSize function
//       // This will make our marker's size proportionate to its population
//       radius: markerSize(cities[i].population)
//     }).quakeLocal.bindPopup("Location: <br>Magnitude: <br>Depth:").addTo(myMap);
//   }
  

//   // Make a circle marker for each quake
//   L.circle([45.52, -122.69], {
//     color: "green", // quake depth
//     fillColor: "green",
//     fillOpacity: 0.75,
//     radius: 500 // quake magnitude
//   }).addTo(myMap);

// // Make the Quake marker layer
// let quakeLocal = L.marker([45.52, -122.67], {
//   }).addTo(myMap);

// // Make the legend

// // Make the popup



// // Load the json data for the last 7 days

// // ----------------------------------------------------

// // An array which will be used to store created cityMarkers
// var cityMarkers = [];

// for (var i = 0; i < cities.length; i++) {
//   // loop through the cities array, create a new marker, push it to the cityMarkers array
//   cityMarkers.push(
//     L.marker(cities[i].location).bindPopup("<h1>" + cities[i].name + "</h1>")
//   );
// }

// // Add all the cityMarkers to a new layer group.
// // Now we can handle them as one group instead of referencing each individually
// var cityLayer = L.layerGroup(cityMarkers);

// // Define variables for our tile layers
// var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox/light-v10",
//   accessToken: API_KEY
// });

// var dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox/dark-v10",
//   accessToken: API_KEY
// });

// // Only one base layer can be shown at a time
// var baseMaps = {
//   Light: light,
//   Dark: dark
// };

// // Overlays that may be toggled on or off
// var overlayMaps = {
//   Cities: cityLayer
// };

// // Create map object and set default layers
// var myMap = L.map("map", {
//   center: [46.2276, 2.2137],
//   zoom: 6,
//   layers: [light, cityLayer]
// });

// // Pass our map layers into our layer control
// // Add the layer control to the map
// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
// }).addTo(myMap);