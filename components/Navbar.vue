<script lang="ts" setup>
import { IApp } from "~/utils/app";

import { useMyStore, IFilterPanelSelection } from "../stores/useStore";
import { storeToRefs } from "pinia";

import { ref, computed } from "vue";
// state
const store = useMyStore();
const currentLocation = useState<[number, number] | null>(
  "navbar.currentLocation",
  () => null
);

// dont destructor
const { center } = storeToRefs(store);
// lifecycle
let timer: NodeJS.Timer;
onMounted(() => {
  if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      currentLocation.value = [
        position.coords.longitude,
        position.coords.latitude,
      ];
      store.setCurrentLocation(currentLocation.value);
    });
  } else {
    /* geolocation IS NOT available */
    console.log("geolocation unavailable");
  }
});
const zoom = computed(() => {
  return store.getZoom;
});
// onBeforeUnmount(() => {
//   if (timer) clearInterval(timer);
// });
// methods
// const updateDrawerOptions = () => {
//   // drawer
//   if (showDrawer.value || showOptions.value) {
//     document.body.classList.add("overflow-hidden");
//   } else {
//     document.body.classList.remove("overflow-hidden");
//   }
// };
</script>
<template>
  <header>
    <nav>
      <ul>
        <!-- <li>
          <a href="#" v-for="(selection, i) in store.getSelections" :key="i">{{
            selection.selection
          }}</a>
        </li> -->
        <li>
          <a href="#">{{
            currentLocation ? `Current Location: ${currentLocation}` : ""
          }}</a>
        </li>
        <li>
          <a href="#">Center: {{ center }} Zoom: {{ zoom }}</a>
        </li>
      </ul>
    </nav>
  </header>
  <!-- <div class="toolbar">
    <div>
      {{ currentLocation ? `Current Location: ${currentLocation}` : "" }}
      Center: {{ center }} Zoom: {{ zoom }}
    </div>
    <div>
      <button v-for="(selection, i) in store.getSelections" :key="i">
        {{ selection.selection }}
      </button>
    </div>
  </div> -->
</template>

<style lang="scss">
.toolbar {
  width: 100%;
  display: flex;
  background: grey;
  padding: 10px;
  margin: 10px;
  color: white;
  position: absolute;
  top: 0;
}

.slide-fade-from-up-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-from-up-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-from-up-enter-from,
.slide-fade-from-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
a.router-link-active {
  font-weight: bold;
}
a.router-link-exact-active {
  color: theme("colors.slate.900");
}
html.dark {
  a.router-link-exact-active {
    color: theme("colors.white");
  }
}

header {
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 25px 0 black;
  z-index: 1;
}

header * {
  display: inline;
}

header li {
  margin: 20px;
}

header li a {
  color: black;
  text-decoration: none;
}
</style>
