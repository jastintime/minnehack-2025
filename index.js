
import * as L from "https://unpkg.com/leaflet/dist/leaflet-src.esm.js";
const minneapolis = [44.986656, -93.258133];
// Create a map and center it on minneapolis
const map = L.map('map').setView(minneapolis, 13);
const dialog = document.querySelector(`dialog`)
const dialogCloseButton = document.querySelector(`.close`);
dialogCloseButton.addEventListener(`click`, () => dialog.close())

// Add tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
   maxZoom: 19,
   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function showLocation() {

}

function addMarker(location, name, ) {
   const pin = L.marker(location).addTo(map);
   pin.bindPopup("Hello there!");
}

addMarker(minneapolis, `This is minneapolis`);
dialog.showModal()