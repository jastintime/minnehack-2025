import * as L from "https://unpkg.com/leaflet/dist/leaflet-src.esm.js";
import { getLocations } from "./network.js";
import { showModalLocation } from "./dialog.js";
import "./BoundaryCanvas.js"

const oldMap = 'https://mapwarper.net/maps/tile/89429/{z}/{x}/{y}.png';
const satellite = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
// make account here https://wiki.openstreetmap.org/wiki/Esri#Interested_in_using_Esri_World_Imagery_in_your_own_application?

var customIcon = L.icon({
	iconUrl: './assets/custom_pin.png',
	iconSize: [20, 28], // size of the icon
	iconAnchor: [22, 25], // point of the icon which will correspond to marker's location
});

const map = L.map('map', {
	zoom: 10,
	maxZoom: 100,
	maxBoundsViscosity: .7,
	minZoom: 12,
});

// load our geojson bounds into a json object and once we receive that 
// Promise we setup our map around that boundary
var cityB = fetch('./minneapolis_and_stpaul.geojson').then(function(response) {
	return response.json();
}).then(function(cityB) {
	var geojsonLayer = L.geoJSON(cityB, {
		"fillOpacity": 0
	}).addTo(map);
	const bounds = geojsonLayer.getBounds();
	map.fitBounds(bounds);
	map.setMaxBounds(bounds);

	var satelliteLayer = L.TileLayer.boundaryCanvas(satellite, {
		maxZoom: 19,
		attribution: 'Esri, TomTom, Garmin, FAO, NOAA, USGS, © OpenStreetMap contributors, and the GIS User Community',
		ext: 'jpg',
		boundary: cityB,
	}).addTo(map);

	// the historic map we stitched together
	var oldLayer = L.tileLayer(oldMap, {
		maxZoom: 19,
		attribution: '&copy; Regents of the University of Minnesota | &copy; <a href="https://apps.lib.umn.edu/mhapo/" target="_blank">UMN-MHAPO</a>',
	}).addTo(map);

	// Layer control
	var baseMaps = {
		"Current": satelliteLayer,
	};
	var overlayMap = {
		"1957": oldLayer,
	};
	var layerControl = L.control.layers(baseMaps, overlayMap).addTo(map);
});




// Function to show locations
async function showLocations() {
	const data = await getLocations();
	console.log("data we have:", data);
	for (const loc of data) {
		addMarker(loc.coordinates, loc);
	}
}

// Function to add a marker
function addMarker(location, context) {
	const pin = L.marker(location, {
		icon: customIcon
	}).addTo(map);
	pin.on('click', showModalLocation.bind(window, context));
}

// Modal handling
const aboutDialog = document.querySelector('#about');
const aboutCloseButton = document.querySelector('#about-close');
const aboutButton = document.querySelector('#about-button');

aboutButton.addEventListener('click', () => aboutDialog.showModal());
aboutCloseButton.addEventListener('click', () => aboutDialog.close());

// Show locations after the map has loaded
showLocations();
