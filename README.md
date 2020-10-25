# leaflet-challenge
Using leaflet maps to show locations of earthquakes

# Synopsis

Earthquake data was collected from the US Geological Society webite (<a href="https://earthquake.usgs.gov/earthquakes/" target="_blank">earthquake.usgs.gov</a>). The range of data on the interactive map is earthquakes in the last week with a magnitude greater that 2.5.

## Loading the Map

This interactive map requires an API key from <a href="https://www.mapbox.com/" target="_blank">Mapbox</a>. You can create a free account to have access to a general public key. The key will need to be copied in to static/js/configEDIT.js and the file renamed to config.js.

## Interpreting the Visualization

The size of the maker is based on the recored magnitude of the earthquake. However, due to the curvature of the eath the magnitudes are disproportionate as you get further from the equator in either hemishere. The color of each marker shows the depth of the earthquakes in kilometers as indicated in the legend in the bottom right. Clicking on any earthquake marker will give a popup with the location, magnitude and depth.

#