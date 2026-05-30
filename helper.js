function get(id){
  return document.getElementById(id);
}

function showMap(lat,lon){
  let location = [lat, lon];
  if(!mapObj){
      mapObj = L.map("map-area");
  } 
  let map = mapObj.setView(location, 14);

  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  }).addTo(map);

  let marker = L.marker(location).addTo(map);
}   
function card( info ){ 
  let build = `<div class="map-card map-fitted">
                  <h2>${info.spc_common}</h2>
                  <hr>
                  <h3>Latitude: ${info.latitude}</h3>
                  <h3>Longitude: ${info.longitude}</h3>
                  <p>Zipcode: ${info.zipcode}</p>
                  <p>Address: ${info.address}</p>`;
                  if(info.latitude && info.longitude){
                    build += `<input type="button" value="Map" onclick="showMap( ${info.latitude}, ${info.longitude} )">`;
                  }
    build +=`</div>`;
  return build;
}