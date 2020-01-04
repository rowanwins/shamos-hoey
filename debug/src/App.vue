<template>
  <div id="app"></div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import './coords';
import isSimple from '../../src/main'

// Hack to get the markers into Vue correctly
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

const trouble = require('../../test/fixtures/simple/MultiLine2.geojson')

export default {
  name: 'App',
  mounted: function () {
    
    const layer = L.geoJSON(trouble)
    let map = window.map = L.map('app', {
      crs: L.CRS.Simple
    }).fitBounds(layer.getBounds())  

    layer.addTo(map)

    map.addControl(new L.Coordinates());

    // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    //   subdomains: 'abcd',
    //   maxZoom: 19
    // }).addTo(map)


    console.log(isSimple(trouble))

  }
}

</script>

<style>
 html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0px;
 }
</style>
