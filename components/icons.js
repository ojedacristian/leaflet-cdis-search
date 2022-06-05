const colorIcons = L.Icon.extend({
    options: {
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }
});
const urlIcons = "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-";
const 
    blueIcon = new colorIcons({ iconUrl: urlIcons + "blue.png" }),
    goldIcon = new colorIcons({ iconUrl: urlIcons + "gold.png" }),
    redIcon = new colorIcons({ iconUrl: urlIcons + "red.png" }),
    greenIcon = new colorIcons({ iconUrl: urlIcons + "green.png" }),
    orangeIcon = new colorIcons({ iconUrl: urlIcons + "orange.png" }),
    yellowIcon = new colorIcons({ iconUrl: urlIcons + "yellow.png" }),
    violetIcon = new colorIcons({ iconUrl: urlIcons + "violet.png" }),
    greyIcon = new colorIcons({ iconUrl: urlIcons + "grey.png" }),
    blackIcon = new colorIcons({ iconUrl: urlIcons + "black.png" });

L.icon = function (options) {
    return new L.Icon(options);
};

export const icons = {
    CDIOK: redIcon,
    CDI: redIcon,
    CDIN: greyIcon,
    CDR: blueIcon,
    CIC: orangeIcon,
    HUE: greenIcon,
    IM: goldIcon,
    MAY: greyIcon,
    ANP: violetIcon,
    MDC: yellowIcon
};