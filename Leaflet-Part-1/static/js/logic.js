
const url         = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';
const colorArray  = [ '#DB0000', '##E400B4', '#CD00ED', '#1000F6', '#0070FF', 
                       '#22ADFF', '#44E0FF', '#66FFFF', '#88FFEE', '#AAFFE1', 
                       '#CCFFE2' ];
let circleMarkers = [];

function markerSize(mag) { 
  if (mag < 0) { mag = mag * -1};
  return mag * 60000; 
}

// Perform a GET request to the query URL/
d3.json(url).then(function (data) { 
  createFeatures(data.features); 
});

function createMap(earthquakes) {

  let street   = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
                              {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' });
  let topo     = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', 
                              { attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, \
                              <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org"> \
                              OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'});
  let baseMaps = { "Street Map": street, "Topographic Map": topo };

  // Create an overlay object to hold our overlay
  let circles     = L.layerGroup(circleMarkers);
  console.log(circles);
  let overlayMaps = { 'Earthquakes Markers': earthquakes,  
                      'Earthquakes Circles': circles};

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap       = L.map("map", {  
                    center: [ 37.09, -95.71 ], 
                    zoom: 3, 
                    layers: [street, earthquakes, circles] });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);
}

function createFeatures(earthquakeData) {

  function onEachFeature(feature, layer) {
    // retrieve long and lat
    coord = [ feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
    // Use depth to calculate the circle fill color
    depth = feature.geometry.coordinates[2];
    if (depth > 100) {fgcolor = colorArray[0]} else
    if (depth >  90) {fgcolor = colorArray[1]} else
    if (depth >  80) {fgcolor = colorArray[2]} else
    if (depth >  70) {fgcolor = colorArray[3]} else    
    if (depth >  60) {fgcolor = colorArray[4]} else
    if (depth >  50) {fgcolor = colorArray[5]} else
    if (depth >  40) {fgcolor = colorArray[6]} else
    if (depth >  30) {fgcolor = colorArray[7]} else
    if (depth >  20) {fgcolor = colorArray[8]} else
    if (depth >  10) {fgcolor = colorArray[9]} else
                     {fgcolor = colorArray[10]};
    circleMarkers.push(L.circle(coord, {  stroke      : true, 
                                          fillOpacity : 0.75, 
                                          color       : "black", 
                                          weight      : 1,
                                          fillColor   : fgcolor,
                                          radius      : markerSize(feature.properties.mag),
                                          bindPopup   : (`<h3>${feature.properties.place}</h3><hr>
                                                          <p>${new Date(feature.properties.time)}</p>
                                                          <p>Longitude: ${feature.geometry.coordinates[1]}</p>
                                                          <p>Latitude : ${feature.geometry.coordinates[0]}</p>
                                                          <p>Depth    : ${feature.geometry.coordinates[2]}</p>
                                                          <p>Magnitude: ${feature.properties.mag}</p>`)}));

    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
                     <p>${new Date(feature.properties.time)}</p>
                     <p>Longitude: ${feature.geometry.coordinates[1]}</p>
                     <p>Latitude : ${feature.geometry.coordinates[0]}</p>
                     <p>Depth    : ${feature.geometry.coordinates[2]}</p>
                     <p>Magnitude: ${feature.properties.mag}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, { onEachFeature: onEachFeature });

  // Send our earthquakes layer to the createMap function

  createMap(earthquakes);
}

