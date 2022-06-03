// const parentGroup = L.markerClusterGroup();
let categories = {
    CDI: [],
    CDR: [],
    CIC: [],
    HUE: [],
    IM: [],
    MAY: [],
    ANP: [],
    MDC: [],
    CDIN: [],
}

const spreadsheetIDMDS = "1gBBlBkU2nMio5MV_qadALPZSRR-SSLQ6zWPNRNTj5ms";
const spreadsheetIDSSPIN = "1YwWUH_qOs0ZS6lyOuMzIapvVNhZxe9sSXh66zkxIzTA";
const query = encodeURIComponent(
    // "Select * where N = 'CIC' OR N= 'CDI' OR N= 'CDR' OR N='CDIN' LIMIT 100"
    "Select * where N = 'CDIN' LIMIT 100"
);
const url = `https://docs.google.com/spreadsheets/d/${spreadsheetIDSSPIN}/gviz/tq? ${'&tq=' + query}`

// Buscamos los datos Json de Google
fetch(url)
    .then((res) => res.text())
    .then((rep) => {
        const data = JSON.parse(rep.substr(47).slice(0, -2));
        console.log(data);
        const entry = data.table.rows;
        const amount = entry.length;
        let i;
        for (i = 0; i < amount; i++) {
            // console.log("Latitud", entry[i].c[9]?.v || "null");
            let lat = entry[i].c[9]?.v || "";
            let lon = entry[i].c[10]?.v || "";
            //let titulo = entry[i]["gsx$titulo"]["$t"];
            let categoria = entry[i].c[1]?.v || "";
            let articulador = entry[i].c[2]?.v || "";
            //let provincia = entry[i]["gsx$provincia"]["$t"];
            //let localidad = entry[i]["gsx$localidad"]["$t"];
            let dir = entry[i].c[3]?.v || "";
            let email = entry[i].c[6]?.v || "";
            let tel = entry[i].c[4]?.v || "";
            let web = entry[i].c[12]?.v || "";
            let cat = entry[i].c[13]?.v || "";
            let expte = entry[i].c[14]?.v || "";
            let btnWeb =
                web === ""
                    ? ""
                    : '<a target="_blank" href="' + web + '">Conocé más</a>';
            let marker = L.marker([lat, lon],
                { 
                    title: articulador,
                    cat
                }
                // { icon: icons[cat] }
            )
                .bindPopup(`
        <p>${categoria}</p> 
          <h4>${articulador}</h4> 
          <p> ${dir}</p> 
          <p> ${email}</p> 
          <p> ${tel}</p> 
          <p> ${expte}</p> 
          ${btnWeb} 
          <p><a target="_blank" href="https://www.argentina.gob.ar/desarrollosocial/sumainformacion">Sumá información</a></p>
        `
                )
            categories[cat].push(marker)
        }
        load()
    });

const load = () => {

    const CIC = L.layerGroup(categories.CIC)
    const CDR = L.layerGroup(categories.CDR)
    const CDIN = L.layerGroup(categories.CDIN)

    const mapa = L.tileLayer("https://gis.argentina.gob.ar/osm/{z}/{x}/{y}.png", {
        attribution:
            '&copy; Contribuidores <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    const map = L.map("map", { layers: [mapa, CIC] }).setView([-40.44, -63.59], 4.5);
    const baseMaps = {
        Mapa: mapa
    };
    const overlayMaps = {
        'CDR': CDR,
        'CIC': CIC,
        'CDIN': CDIN
    };

    L.control
        .layers(baseMaps, overlayMaps, {
            collapsed: window.screen.width < 800 ? true : false,
            hideSingleBase: true
        })
        .addTo(map);

    L.control.search({
        layer: L.layerGroup([CIC, CDR, CDIN]),
        initial: false,
        marker: L.circleMarker([0, 0], { radius: 20 }),
        zoom: 10,
        buildTip: function (text, val) {
            const type = val.layer.options.cat;
            return `<a href='#' class=${type}> <span>${text}</span> <b>${type}</b></a>`;
        }
    })
        .addTo(map);
}
