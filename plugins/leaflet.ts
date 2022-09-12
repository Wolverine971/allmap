import L from "leaflet";

export default defineNuxtPlugin((NuxtApp) => {
  return {
    provide: L,
  };
});
