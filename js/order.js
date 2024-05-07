var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Get current location from browser

navigator.geolocation.getCurrentPosition(function (position) {
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  var marker = L.marker([
    position.coords.latitude,
    position.coords.longitude,
  ]).addTo(map);

  map.setView([position.coords.latitude, position.coords.longitude], 15);
});
