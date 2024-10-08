import { icons } from './components/icons.js'
import { loadControls } from './components/controls/controls.js'

const mcgLayerSupportGroup = L.markerClusterGroup.layerSupport();
let categories = {
    INF:[],
    SDP: [],
    PRI: [],
}

const idspr = '1HEzJEHa0oBuL2jukH74PHtX0VtgzDrrBTZvungFrivs'

const url = `https://docs.google.com/spreadsheets/d/${idspr}/pub?output=csv`

const codeName = {
    SDP: "Sistemas de protección",
    PRI: "Primeros años",
    INF: "Primera Infancia"
} 

// Buscamos los datos Json de Google
fetch(url)
    .then((res) => res.text())
    .then((rep) => {
        const items = rep
            .split("\n")
            .slice(1)
            .map((row)=> {
                const [cat, nombre, region, provincia, localidad, espacio, direccion, profesion, latitud, longitud] = row.split(",");
                return { cat, nombre, region, provincia, localidad, espacio, direccion, profesion, latitud, longitud}
            })
        let i;
        for (i = 0; i < items.length; i++) {
            // console.log("Latitud", entry[i].c[9]?.v || "null");
            let lat = items[i].latitud || "";
            let lon = items[i].longitud || "";
            //let titulo = entry[i]["gsx$titulo"]["$t"];
            //let provincia = entry[i]["gsx$provincia"]["$t"];
            //let localidad = entry[i]["gsx$localidad"]["$t"];
            let nombre = items[i].nombre
            //let profesion = items[i].profesion
            let region = items[i].region
            let localidad = items[i].localidad
            let espacio = items[i].espacio

            let cat = items[i].cat || "";

            let marker = L.marker([lat, lon],
                {
                    title: nombre,
                    icon: icons[cat],
                    cat,
                },
            )
                .bindPopup(`
          <h4>${nombre}</h4> 
          <p>${codeName[cat]} - Región ${region}</p>
          <h4>${localidad} - ${espacio}</h4>
          <small>
            <a href="http://www.google.com/maps/place/${lat},${lon}" target='_blank'>Ver en Google Maps</a>
          </small>
        `
                )
            categories[cat].push(marker)
        }
        load()
    });

const load = () => {
    console.log(categories)
    const SDP = L.layerGroup(categories.SDP);
    const PRI = L.layerGroup(categories.PRI)
    const INF = L.layerGroup(categories.INF)



    const mapa = L.tileLayer("https://gis.argentina.gob.ar/osm/{z}/{x}/{y}.png", {
        attribution:
            '&copy; Contribuidores <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    // const mapboxUrl = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3Jpc3RpYW5vamVkYSIsImEiOiJjazVzNWRnczcwa2c0M2ttcXpzNzl6aGV1In0.weNfOTYnFN4OOCj0pye69g";

    // const satellite = L.tileLayer(mapboxUrl, {
    //     id: "cristianojeda/ck5wlrbjg042x1in6xgq6dop9",
    //     tileSize: 512,
    //     zoomOffset: -1
    //   });

    const map = L.map("map", { layers: [mapa, mcgLayerSupportGroup] }).setView([-40.44, -63.59], 4.5);
    mcgLayerSupportGroup.addTo(map)
    mcgLayerSupportGroup.checkIn(INF)
    mcgLayerSupportGroup.checkIn(SDP)
    mcgLayerSupportGroup.checkIn(PRI)

    const baseMaps = {
        Mapa: mapa,
        // Satellite: satellite
    };
    const overlayMaps = {
        'Primera Infancia': INF,
        'Sistemas de protección': SDP,
        'Primeros años': PRI,
    };

    loadControls([SDP, PRI, INF]) // MostrarOcultar Todos - Ampliar - Ubicacion
    L.control.ubicacion({ position: "bottomright" }).addTo(map);
    L.control.ampliar({ position: "bottomright" }).addTo(map);
    //L.control.mostrar({ position: "topright" }).addTo(map);


    L.control
        .layers(baseMaps, overlayMaps, {
            collapsed: window.screen.width < 800 ? true : false,
            hideSingleBase: true
        })
        .addTo(map);

/*    L.control.search({
        // layer: L.layerGroup([CIC, CDR, CDI, CDIN]),
        layer: mcgLayerSupportGroup,
        initial: false,
        // marker: L.circleMarker([0, 0], { radius: 20 }),
        zoom: 16,
        buildTip: function (text, val) {
            const type = val.layer.options.cat;
            return `<a href='#' class=${type}> <button>${type}</button> <span>${text}</span> </a>`;
        }
    })
        .addTo(map);*/
}
