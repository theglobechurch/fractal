const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

export default function () {

  const mapEl = document.querySelector('.js-map');

  if (!mapEl) { return; }

  const mapBoxCSS = 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css';
  const address = mapEl.dataset.address;
  const zoom = mapEl.dataset.zoom || 15;
  const key = 'pk.eyJ1IjoidGhlZ2xvYmVjaHVyY2giLCJhIjoiY2p0aDEybTV0MDh2bjQzbzZxM2VjeGx6aCJ9.0vbmWQqc94eTPTIVeUj_jA'
  const mapStyle = 'mapbox://styles/theglobechurch/cjtg1xmxk0wwq1fmm3wwtl9vt';

  injectCSS(mapBoxCSS);

  mapboxgl.accessToken = key;
  const baseClient = mbxClient({ accessToken: mapboxgl.accessToken });
  const geocodeService = mbxGeocoding(baseClient);
  geocodeService.forwardGeocode({
    query: address,
    autocomplete: false,
    limit: 1
  })
  .send()
  .then(function (response) {
    if (response && response.body && response.body.features && response.body.features.length) {
      const feature = response.body.features[0];
      const pinSetup = {
        "id": "points",
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": feature.center
              }
            }]
          }
        },
        "layout": {
          "icon-image": "pin",
          "icon-size": 0.25
        }
      };

      const map = new mapboxgl.Map({
        container: mapEl,
        style: mapStyle,
        center: feature.center,
        zoom: zoom
      });

      map.on('load', function() {
        map.loadImage('/assets/blocks/map/assets/map_pin2.png', function(error, image) {
          if (error) throw error;
          map.addImage('pin', image);
          map.addLayer(pinSetup);
        });
      });
    }
  });
}

function injectCSS(url) {
  if (document.createStyleSheet) {
    document.createStyleSheet(mapBoxCSS);
  } else {
    var styles = "@import url(mapBoxCSS);";
    var newSS=document.createElement('link');
    newSS.rel='stylesheet';
    newSS.href='data:text/css,'+escape(styles);
    document.getElementsByTagName("head")[0].appendChild(newSS);
  }
}
