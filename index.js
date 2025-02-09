
import * as L from "https://unpkg.com/leaflet/dist/leaflet-src.esm.js";
import { getLocations,} from "./network.js";
import { showModalLocation } from "./dialog.js";

const minneapolis = [44.986656, -93.258133];
const oldMap = `https://mapwarper.net/maps/tile/89404/{z}/{x}/{y}.png`;
const osm = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const osmAttr = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const satellite = `https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}`;
// Create a map and center it on minneapolis
// TODO: these cords don't work, and i don't wanna spend 30min goosechasing how to line em up perfectly 
const map = L.map('map').setView([45.01323589435436, -93.31595003819945], 13);

L.tileLayer(satellite, {
   maxZoom: 19,
   attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
   ext: 'jpg'
}).addTo(map);

// this code will stop the user from dragging the map outside the bounds of minneapolis
// it comes from here: https://stackoverflow.com/questions/25741532/disable-drag-once-attained-maximum-bounds-in-leaflet
// tysm artyom!
var bounds = L.latLngBounds([[45.01323589435436, -93.31595003819945], [44.95058896557884, -93.24742388864514]]);
map.setMaxBounds(bounds);
map.on('drag', function() {
	map.panInsideBounds(bounds, { animate: false });
});


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