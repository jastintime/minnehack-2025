
import * as L from "https://unpkg.com/leaflet/dist/leaflet-src.esm.js";
import { getLocations,} from "./network.js";
import { showModalLocation } from "./dialog.js";

const minneapolis = [44.986656, -93.258133];
const oldMap = `https://mapwarper.net/maps/tile/89404/{z}/{x}/{y}.png`;
const osm = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
// Create a map and center it on minneapolis
const map = L.map('map').setView(minneapolis, 13);

L.tileLayer(osm, {
   maxZoom: 19,
   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Add tiles
L.tileLayer(oldMap, {
   maxZoom: 19,
}).addTo(map);


async function showLocations() {
   const data = await getLocations();
   console.log(data);
   for (const loc of data) {
      addMarker(loc.coordinates, loc);
   }
}

function addMarker(location, context)  {
   const pin = L.marker(location).addTo(map);
   pin.on(`click`, showModalLocation.bind(window, context))
}

// showLocations();