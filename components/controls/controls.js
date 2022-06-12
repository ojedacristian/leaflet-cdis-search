export const loadControls = (subGroups)=> {

    L.Control.mostrar = L.Control.extend({
        onAdd: function (map) {
          let div1 = L.DomUtil.create("div", "todosdiv");
          let label = L.DomUtil.create("label", "", div1);
          let div2 = L.DomUtil.create("div", "", label);
          let input = L.DomUtil.create("input", "", div2);
          input.type = "checkbox";
          input.checked = true;
          let span = L.DomUtil.create("span", "b", div2);
          label.id = "todos";
          span.textContent = "Mostrar / Ocultar Todos";
          let visible = 1;
          L.DomEvent.on(input, "click", function () {
            if (visible) {
              subGroups.map(sub => sub.remove())
              visible = 0;
            } else {
              subGroups.map(sub => sub.addTo(map))
              visible = 1;
            }
          });
          return div1;
        },
        onRemove: function (map) { }
      });
     L.control.mostrar = function (opts) {
        return new L.Control.mostrar(opts);
      };

      L.Control.ubicacion = L.Control.extend({
        onAdd: function (map) {
          let button = L.DomUtil.create("button");
          button.id = "ubicacion";
          L.DomUtil.create("i", "fa fa-map-marker fa-2x azul", button);
          button.style.padding = "0.5em";
          button.title = "Mi Ubicación";
          L.DomEvent.on(button, "click", function () {
            let browserLat;
            let browserLong;
            navigator.geolocation.getCurrentPosition(
              function (position) {
                browserLat = position.coords.latitude;
                browserLong = position.coords.longitude;
                let marker_actual = L.marker([browserLat, browserLong], {
                  icon: L.divIcon({
                    className: 'here',
                    iconSize: L.point(16, 16),
                    html: 'V'
                  })
                }).addTo(map);
                marker_actual.bindPopup("<b>Usted está aquí<b>").openPopup();
                map.setView([browserLat, browserLong], 16);
              },
              function (err) {
                console.error(err);
              }
            );
          });
          return button;
        },
        onRemove: function (map) { }
      });
      L.control.ubicacion = function (opts) {
        return new L.Control.ubicacion(opts);
      };
      
      L.Control.ampliar = L.Control.extend({
        onAdd: function (map) {
          let button = L.DomUtil.create("button");
          button.id = "ampliar";
          L.DomUtil.create("i", "fa fa-arrows-alt fa-lg azul", button);
          button.style.padding = "0.5em";
          button.title = "Ampliar mapa";
          L.DomEvent.on(button, "click", function () {
            map.setView([-40.44, -63.59], 4.5);
          });
          return button;
        },
        onRemove: function (map) { }
      });
      L.control.ampliar = function (opts) {
        return new L.Control.ampliar(opts);
      };
}

