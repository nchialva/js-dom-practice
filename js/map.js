

let options={
  enableHighAccuracy:true,
  timeout: 5000,
  maximunAge: 0
}

//geolocalizador

if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(success,error,options);
}else{
  alert("Los servicios de geolocalizacion no estan disponibles")
}


  
function success(position){//si todo va bien se muestra el mapa
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let map = L.map('mapa',{
    center:[latitude,longitude],
    zoom:14
  })

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Mi openStreetMap'
}).addTo(map);

let control = L.Routing.control({
  waypoints:[
    L.latLng(latitude,longitude),
    L.latLng(45.042514,7.635820)
  ],
  language: 'es',

}).addTo(map)
}

function error(){

}