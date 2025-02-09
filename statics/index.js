
import * as L from "https://unpkg.com/leaflet/dist/leaflet-src.esm.js";
import { getLocations,} from "./network.js";
import { showModalLocation } from "./dialog.js";

const minneapolis = [44.986656, -93.258133];
const oldMap = `https://mapwarper.net/maps/tile/89404/{z}/{x}/{y}.png`;
const osm = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const osmAttr = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const satellite = `https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}`;
// Create a map and center it on minneapolis
const map = L.map('map').setView(minneapolis, 13);

L.tileLayer(satellite, {
   maxZoom: 19,
   attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
   ext: 'jpg'
}).addTo(map);

// Add tiles
L.tileLayer(oldMap, {
   maxZoom: 19,
}).addTo(map);


async function showLocations() {
   const data = await getLocations();
   console.log(`data we have:`, data);
   for (const loc of data) {
      addMarker(loc.coordinates, loc);
   }
}

function addMarker(location, context)  {
   const pin = L.marker(location).addTo(map);
   pin.on(`click`, showModalLocation.bind(window, context))
}

const aboutDialog = document.querySelector('#about');
const aboutCloseButton = document.querySelector('#about-close');
const aboutButton = document.querySelector('#about-button');

aboutButton.addEventListener(`click`, () => aboutDialog.showModal());
aboutCloseButton.addEventListener(`click`, () => aboutDialog.close());

showLocations();