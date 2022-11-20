<template>
  <client-only>
    <!-- <LMap style="height: 50vh">
      <LGeoJson :geojson="geojson" :options="geojsonOptions" />
    </LMap> -->
    <!-- v-model="zoom"
        v-model:zoom="zoom" -->

    <!-- @zoom="zoom = $event"
        
        :value="zoom"
        @zoom="zoom = $event" -->

    <l-map
      style="height: 50vh; width: 100%"
      :center="center"
      :zoom="mapZoom"
      @update:center="centerUpdated"
    >
      <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        :options="mapboxOptions"
        layer-type="base"
      />

      <l-control-layers />
      <l-control position="bottomleft">
        <button
          @click="openFilterPanel"
          class="p-2 m-2 transition duration-300 ease-in bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-md inline-flex items-center"
        >
          Filter Panel
        </button>
      </l-control>
      <l-marker :lat-lng="[0, 0]" draggable @moveend="log('moveend')">
        <l-tooltip> lol </l-tooltip>
      </l-marker>

      <l-marker :lat-lng="[47.41322, -1.219482]">
        <l-icon :icon-url="iconUrl" :icon-size="iconSize" />
      </l-marker>

      <l-marker :lat-lng="[50, 50]" draggable @moveend="log('moveend')">
        <l-popup> lol </l-popup>
      </l-marker>
      <div v-if="geojson">
        <LGeoJson :geojson="geojson" :options-style="geojsonstyle" />
      </div>

      <l-polyline
        :lat-lngs="[
          [47.334852, -1.509485],
          [47.342596, -1.328731],
          [47.241487, -1.190568],
          [47.234787, -1.358337],
        ]"
        color="green"
      ></l-polyline>
      <l-polygon
        v-if="polygon && polygon.length"
        :lat-lngs="polygon"
        color="#41b782"
        :fill="true"
        :fillOpacity="0.5"
        fillColor="#41b782"
      />
    </l-map>
  </client-only>
</template>
<script lang="ts" setup>
import "leaflet/dist/leaflet.css";
import { useMyStore } from "../stores/useStore";
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import { getCongressionalDistrict, getTigerState } from "../api/geos";
// import L from 'leaflet'
// import {
//   LMap,
//   LGeoJson,
//   LIcon,
//   LTileLayer,
//   LMarker,
//   LControlLayers,
//   LControl,
//   LTooltip,
//   LPopup,
//   LPolyline,
//   LPolygon,
//   LRectangle,
// } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { IFeatureCollection } from "~~/api/feature";
import L from "leaflet";
const config = useRuntimeConfig();
let map: any = ref(null);
const store = useMyStore();
// dont destructor
const { center } = storeToRefs(store);

let geojson = ref({
  type: "IFeatureCollection",
  features: [],
});

let polygon: any = null;
let geo = ref("");

const recurseArr = (newArr: any[]) => {
  return newArr.map((item) => {
    if (item.length === 2) {
      item.reverse();
    } else {
      recurseArr(item);
    }
    return item;
  });
};

const formatGeo = (geo: IFeatureCollection) => {
  if (geo.features) {
    geo.features = geo.features.map((f) => {
      f.geometry.coordinates = f.geometry.coordinates.map((coords) => {
        recurseArr(coords);
        return coords;
      });
      return f;
    });
  }
  return geo;
};

const renderMap = async () => {
  map.value = L.map("mapid", {
    center: [40.911552736237624, -73.9934208],
    zoom: 10,
    minZoom: 3,
  });
  // .setView([51.505, -0.09], 13);
  L.tileLayer(
    `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}`,
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      // maxZoom: ,
      // tileSize: 50,
      id: "mapbox.streets",
      accessToken: config.accessToken,
    }
  ).addTo(map.value);
  map.value.setMaxBounds(map.value.getBounds());
  map.value.on("click", getLatLong);
  map.value.on("zoomend", getZoom);
};
const getLatLong = (e) => {
  // e.preventDefault()
  // preventDefault()
  console.log(e.latlng);
};
const getZoom = (e) => {
  // e.preventDefault()
  // preventDefault()
  console.log(e.target._zoom);
};
const getGetDistrict = async () => {
  console.log("get district");
  const datas = await getTigerState(geo.value);
  // geojson.value = {...datas};
  // this.newGeoNum.forEach((item) => {
  //       recurseArr(item.geometry.rings)
  // })
  polygon = datas; // formatGeo(datas);
  // const data = await getCongressionalDistrict();
  geojson.value = polygon;
  L.geoJSON(polygon, {
    style: function (feature) {
      return { color: "red" };
    },
  })
    .bindPopup(function (layer: any) {
      return layer.feature.properties.description;
    })
    .addTo(map.value);
  console.log(polygon);
};

const filterPanelOpen = useState<boolean>("map.filterPanelOpen", () => false);
// const map = useState<object | null>("map.map", () => null);
const zoom = useState<number>("map.zoom", () => 2);
const iconHeight = useState<number>("map.iconHeight", () => 40);
const iconWidth = useState<number>("map.iconWidth", () => 25);

const iconUrl = `https://placekitten.com/${iconWidth.value}/${iconHeight.value}`;
const iconSize = [iconWidth.value, iconHeight.value];
const mapZoom = 5;
// let zoom: 2, iconWidth: 25, iconHeight: 40;

const geojsonstyle = {
  weight: 2,
  color: "#ECEFF1",
  opacity: 1,
  fillColor: "red",
  fillOpacity: 1,
};
const mapboxOptions = {
  maxZoom: 15,
  minZoom: 3,
  id: "mapbox/dark-v10", // "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: 1,
  accessToken: config.accessToken,
};

// :url="'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'"
// :options="mapboxOptions"

const tileProviders = [
  {
    name: "MapBox",
    visible: true,
    attribution: "",
    url: "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    zoom: 3,
    center: [47.41322, -1.219482],
    bounds: null,
  },
  {
    name: "OpenStreetMap",
    visible: false,
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  {
    name: "OpenTopoMap",
    visible: false,
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  },
];

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: "",
  },
});

onMounted(() => {
  // console.log(LMap);
  renderMap();
});
const log = (str) => {
  console.log(str);
};
const move = (event) => {
  store.setCenter([event.target._lastCenter.lat, event.target._lastCenter.lng]);
};

const centerUpdated = (event) => {
  store.setCenter([event.lat, event.lng]);
};
const openFilterPanel = () => {
  filterPanelOpen.value = true;
};

// onBeforeUnmount(async () => {
//   // HERE is where to load Leaflet components!
//   const { circleMarker } = await import("leaflet/dist/leaflet-src.esm");

//   // And now the Leaflet circleMarker function can be used by the options:
//   this.geojsonOptions.pointToLayer = (feature, latLng) =>
//     circleMarker(latLng, { radius: 8 });
//   this.mapIsReady = true;
// });

// const initMap = () => {
//     map.value = L.map("mapid", {
//     center: [26.46488727752, 46.425649305],
//     zoom: 5,
//     renderer: L.svg(),
//   });
//   // .setView([51.505, -0.09], 13);
//   L.tileLayer(
//     "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
//     {
//       maxZoom: 15,
//       minZoom: 3,
//       id: "mapbox/dark-v10", // "mapbox/streets-v11",
//       tileSize: 512,
//       zoomOffset: -1,
//       accessToken: $config.accessToken,
//     }
//   ).addTo(this.myMap);

//   this.myMap.on("click", this.getLatLong);
//   this.myMap.on("zoomend", this.zoomChange);
// };
</script>

<style scoped>
#mapid {
  height: 700px;
}
.leaflet-pane {
  position: relative !important;
}
.mapDiv {
  height: 700px;
  /* min-height: 100vh;
    background: #212534;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 2rem;
    padding-bottom: 2rem;
    box-sizing: border-box; */
}

body {
  /* min-height: 100vh; */
  background: #212534;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 2rem;
  box-sizing: border-box;
}
</style>
