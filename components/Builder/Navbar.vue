<script lang="ts" setup>
import { IApp } from "~/utils/app";

import { useMyStore, IFilterPanelSelection } from "../../stores/useStore";
import { storeToRefs } from "pinia";

import { ref, computed } from "vue";
// state
const app = useState<IApp>("app");
const store = useMyStore();
const navbar = ref(null);
const showDrawer = useState<boolean>("navbar.showDrawer", () => false);
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
  <div class="toolbar">
    <div>
      {{ currentLocation ? `Current Location: ${currentLocation}` : "" }}
      Center: {{ center }} Zoom: {{ zoom }}
    </div>
    <div>
      <button v-for="(selection, i) in store.getSelections" :key="i">
        {{ selection.selection }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.toolbar {
  width: 100%;
  display: flex;
  background: grey;
  color: white;
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
</style>
