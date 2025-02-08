
import * as L from "https://unpkg.com/leaflet/dist/leaflet-src.esm.js";

// Create a map and center it on minneapolis
const map = L.map('map').setView([44.986656, -93.258133], 13);

// Add tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
   maxZoom: 19,
   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);