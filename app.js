var map = L.map('map', {
    zoom: 14,
    center: new L.latLng(41.8990, 12.4977),
    layers: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
}),
    geojsonOpts = {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: L.divIcon({
                    className: feature.properties.amenity,
                    iconSize: L.point(16, 16),
                    html: feature.properties.amenity[0].toUpperCase(),
                })
            }).bindPopup(feature.properties.amenity + '<br><b>' + feature.properties.name + '</b>');
        }
    };

var poiLayers = L.layerGroup([
    // L.geoJson(bar, geojsonOpts),
    // L.geoJson(pharmacy, geojsonOpts),
    // L.geoJson(restaurant, geojsonOpts)
])
    .addTo(map);

L.control.search({
    layer: poiLayers,
    initial: false,
    propertyName: 'name',
    buildTip: function (text, val) {
        var type = val.layer.feature.properties.amenity;
        return '<a href="#" class="' + type + '">' + text + '<b>' + type + '</b></a>';
    }
})
    .addTo(map);

const overlayMaps = {
    "bar": L.geoJson(bar, geojsonOpts),
    "pharmacy": L.geoJson(pharmacy, geojsonOpts),
    "restaurant": L.geoJson(restaurant, geojsonOpts)
}
var baseMaps = {
    "OpenStreetMap": map,
};
let layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map)

// layerControl.addOverlay(overlayMaps.bar, "Bar")
