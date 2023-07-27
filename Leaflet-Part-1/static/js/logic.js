
// URL for the data source in USGS
const url         = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

// Array of colors used in different parts of the map
const colorArray  = ['#641E16',
                     '#78281F',
                     '#943126',
                     '#B03A2E',
                     '#CB4335',
                     '#E74C3C',
                     '#EC7063',
                     '#F1948A',
                     '#F5B7B1',
                     '#FADBD8',
                     '#FDEDEC'];
                     
let circleMarkers = [];

// function to calculate Circle Size, proportionally to the magnitude
function circleSize(mag) { 
  if (mag < 0) { mag = mag * -1};
  return mag * 60000; 
}

// retrieve the data
d3.json(url).then(function (data) { createFeatures(data.features); } );

// function to create the map with all the required features
function createMap(earthquakes) {
  
  // prepare the layers and assign to the map
  let street   = 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
               {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' })
  let topo     = 
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', 
               { attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, \
               <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org"> \
                OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'});
  let baseMaps = { "Street Map": street, "Topographic Map": topo };

  // Create an overlays
  let circles     = L.layerGroup(circleMarkers);
  let overlayMaps = { 'Earthquakes Markers': earthquakes,  
                      'Earthquakes Circles': circles};
   
  // Final map setup and legend preparation
  let myMap       = L.map("map", {  
                    center: [ 37.09, -95.71 ], 
                    zoom: 3, 
                    layers: [street, earthquakes, circles]});
  var legend   = L.control({position: 'bottomright'});
  legend.onAdd = function (myMap) {
    var div    = L.DomUtil.create('div', 'info legend');
    labels     = ['<strong>Depths</strong> More than X, less than X+1'];
    categories = ['100m','90m','80m','70m','60m','50m','40m','30m','20m','10m','0m'];
    for (var i = 0; i < categories.length; i++) {
      div.innerHTML += labels.push(`<em><i style="color:${colorArray[i]}">> ${categories[i]} - color(${colorArray[i]})</i></em> `);
    }
    div.innerHTML = labels.join('<br>');
    return div;
  };
  legend.addTo(myMap);

  // Create the layer control.
  L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);

}

// process individual Earthquake data
function createFeatures(earthquakeData) {

  function onEachFeature(feature, layer) {
    // retrieve long and lat
    coord = [ feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
    // Use depth to calculate the circle fill color
    depth = feature.geometry.coordinates[2];
    if (depth > 100) {fcolor = colorArray[0]} else
    if (depth >  90) {fcolor = colorArray[1]} else
    if (depth >  80) {fcolor = colorArray[2]} else
    if (depth >  70) {fcolor = colorArray[3]} else    
    if (depth >  60) {fcolor = colorArray[4]} else
    if (depth >  50) {fcolor = colorArray[5]} else
    if (depth >  40) {fcolor = colorArray[6]} else
    if (depth >  30) {fcolor = colorArray[7]} else
    if (depth >  20) {fcolor = colorArray[8]} else
    if (depth >  10) {fcolor = colorArray[9]} else
                     {fcolor = colorArray[10]};
    circleMarkers.push(L.circle(coord,{stroke      : true, 
                                       fillOpacity : 0.75, 
                                       color       : "black", 
                                       weight      : 1,
                                       fillColor   : fcolor,
                                       radius      : circleSize(feature.properties.mag)})
                                      .bindPopup(`<h3 style="color: ${fcolor}">
                                      ${feature.properties.place} (${fcolor})</h3><hr>
                                       <p>${new Date(feature.properties.time)}</p>
                                       <p>Longitude: ${feature.geometry.coordinates[1]}</p>
                                       <p>Latitude : ${feature.geometry.coordinates[0]}</p>
                                       <p>Depth    : ${feature.geometry.coordinates[2]}</p>
                                       <p>Magnitude: ${feature.properties.mag}</p>`));

    layer.bindPopup(`<h3 style="color: ${fcolor}">${feature.properties.place} (${fcolor})</h3><hr>
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

