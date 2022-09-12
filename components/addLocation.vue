<template>
  <div>
    Add Locations

    <div id="app" class="container">
      <card
        data-image="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop="
      >
        <template v-slot:header>
          <h1 slot="header">Location</h1>
        </template>
        <template v-slot:content>
          <input type="text" v-model="address" />
          <button @click="verifyLocation">Verify Location</button>
          <div id="mapLocationId"></div>
        </template>
      </card>
    </div>

    <button @click="showAddLocation = !showAddLocation">Cancel</button>
    <button @click="saveAddLocation">Save</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { IFilterPanel, topLvlGeos } from "~~/models";
import FilterPanel from "./FilterPanel/filterPanel.vue";
const emit = defineEmits(["close"]);

let address = ref("");
interface Props {
  open?: string | number | boolean;
}
const dialog = ref(null);
let showAddLocation = ref(false);

const addLocation = () => {
  showAddLocation.value = true;
};
const saveAddLocation = () => {
  showAddLocation.value = false;
  emit("close");
};
const verifyLocation = async () => {
  if (address.value) {
    const resp = await censusGeoCode(address.value);
    console.log(resp);
  }
};
const showMap = async () => {
  const streets = L.tileLayer(
    `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}`,
    {
      attribution: "@ Mapbox",
      // maxZoom: ,
      // tileSize: 50,
      id: "mapbox.streets",
      accessToken: config.accessToken,
    }
  );
  var littleton = L.marker([39.61, -105.02]).bindPopup(
      "This is Littleton, CO."
    ),
    denver = L.marker([39.74, -104.99]).bindPopup("This is Denver, CO.");
  var cities = L.layerGroup([littleton, denver, aurora, golden]);

  map.value = L.map("mapLocationId", {
    center: store.getCenter,
    zoom: 10,
    minZoom: 3,
    layers: [streets],
  });
};

//   props: ['dataImage'],
</script>

<style lang="scss">
.container {
  padding: 40px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: content-box;
}
</style>
