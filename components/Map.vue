<template>
  <div class="card">
    <h1>Map</h1>
    <div class="mapDiv">
      <div id="mapid">
        <!-- <l-control position="bottomleft">
          <button
            @click="openFilterPanel"
            class="p-2 m-2 transition duration-300 ease-in bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-md inline-flex items-center"
          >
            Filter Panel
          </button>
        </l-control> -->
      </div>
      <button
        id="filterPanelButton"
        @click="openFilterPanel"
        class="p-2 m-2 transition duration-300 ease-in bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-md inline-flex items-center"
      >
        Filter Panel
      </button>
    </div>
    <div>
      <input type="text" v-model="geo" />
      <button @click="getGetState">Get State</button>
    </div>
    <slot name="dialog">
      <Dialog :open="filterPanelOpen" @close="filterPanelOpen = false" />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import "leaflet/dist/leaflet.css";
import { useMyStore } from "../stores/useStore";
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import { getCongressionalDistrict, getTigerState } from "../api/geos";
import "leaflet/dist/leaflet.css";
import { IFeatureCollection } from "~~/api/feature";
// import L from "leaflet";
const config = useRuntimeConfig();
const route = useRoute();

let map = ref<any>(null);
const store = useMyStore();

if (route.query.coords && typeof route.query.coords === "string") {
  console.log(route.query);
  const coords = route.query.coords;
  const newCoords = coords?.split(",").map((c: string) => parseFloat(c.trim()));
  store.setCenter([newCoords[0], newCoords[1]]);
  store.setZoomlvl(13);
}

// dont destructor
const { center } = storeToRefs(store);
const filterPanelOpen = useState<boolean>("map.filterPanelOpen", () => false);
// const map = useState<object | null>("map.map", () => null);
const zoom = useState<number>("map.zoom", () => 2);
const iconHeight = useState<number>("map.iconHeight", () => 40);
const iconWidth = useState<number>("map.iconWidth", () => 25);

const iconUrl = `https://placekitten.com/${iconWidth.value}/${iconHeight.value}`;
const iconSize = [iconWidth.value, iconHeight.value];
const mapZoom = 5;
// let zoom: 2, iconWidth: 25, iconHeight: 40;
let geojson = ref({
  type: "FeatureCollection",
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
  var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  });

  // var streets = L.tileLayer(mapboxUrl, {
  //   id: "mapbox/streets-v11",
  //   tileSize: 512,
  //   zoomOffset: -1,
  //   attribution: mapboxAttribution,
  // });

  // .setView([51.505, -0.09], 13);
  var streets = L.tileLayer(
    `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}`,
    {
      attribution: "@ Mapbox",
      // maxZoom: ,
      // tileSize: 50,
      id: "mapbox.streets",
      accessToken: config.accessToken,
    }
  );
  var baseMaps = {
    "Mapbox Streets": streets,
    OpenStreetMap: osm,
  };
  var littleton = L.marker([39.61, -105.02]).bindPopup(
      "This is Littleton, CO."
    ),
    denver = L.marker([39.74, -104.99]).bindPopup("This is Denver, CO."),
    aurora = L.marker([39.73, -104.8]).bindPopup("This is Aurora, CO."),
    golden = L.marker([39.77, -105.23]).bindPopup("This is Golden, CO.");
  var cities = L.layerGroup([littleton, denver, aurora, golden]);

  var overlayMaps = {
    Cities: cities,
  };

  watch(
    () => store.zoomlvl,
    (newValue: number) => {
      console.log(newValue);
      if (newValue) {
        // dialog.showModal()
        map.value.setZoom(newValue);
      }
    }
  );

  map.value = L.map("mapid", {
    center: store.getCenter as any,
    zoom: 6,
    minZoom: 3,
    layers: [streets, osm, cities],
  });

  map.value.on("click", getLatLong);
  map.value.on("zoomend", getZoom);
  map.value.on("moveend", getCenter);
  var lcontrol = L.control
    .layers(baseMaps, overlayMaps) // { position: "topRight" }
    .addTo(map.value);
};
const getLatLong = (e: any) => {
  // e.preventDefault()
  // preventDefault()
  console.log(e.latlng);
};
const getZoom = (e: any) => {
  console.log(map.value.getZoom());
  store.setZoomlvl(map.value.getZoom());
  store.setCenter(map.value.getCenter());
};

const getCenter = (e: any) => {
  store.setCenter(map.value.getCenter());
  // map.value
};
const getGetState = async () => {
  const name = geo.value
    ? geo.value.charAt(0).toUpperCase() + geo.value.slice(1)
    : "";
  const data = await getTigerState(name);
  L.geoJSON(data, {
    style: function (feature) {
      return { color: "#a591b7" };
    },
  })
    .bindPopup(function (layer: any) {
      return layer.feature.properties.description;
    })
    .addTo(map.value);
  console.log(polygon);
};

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
  renderMap();

  map.value.setZoom(store.zoomlvl);
});

const openFilterPanel = () => {
  filterPanelOpen.value = true;
};
</script>

<style scoped>
.card {
  background: white;
  border-radius: 2px;
  padding: 10px;
  margin: 10px;
}
#filterPanelButton {
  position: absolute;
  bottom: 0;
  left: 20px;
  padding: 10px;
  z-index: 400;
}
#mapid {
  height: 700px;
}
.leaflet-pane {
  position: relative !important;
}
.mapDiv {
  height: 700px;
  position: relative;
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
