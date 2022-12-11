// store/filters.js
import { defineStore } from "pinia";

export interface IFilterPanelSelection {
  id: string;
  geos: string[];
  selection: string;
  code: string;
}
export const useMyStore = defineStore({
  id: "my-store",
  state: () => {
    return {
      center: [38.388049291, -97.271484375],
      currentLocation: null as [number, number] | null,

      filterPanelSelections: [] as IFilterPanelSelection[],
      pathSelections: [] as string[],
      zoomlvl: 0 as number,
    };
  },
  actions: {
    async setCenter(coords: [number, number]) {
      this.center = coords;
    },
    addFPSelection(selection: IFilterPanelSelection) {
      this.filterPanelSelections = [...this.filterPanelSelections, selection];
      this.pathSelections = [...this.pathSelections, selection.id];
    },
    setCurrentLocation(currentLocation: [number, number]) {
      this.currentLocation = [...currentLocation];
    },
    setZoomlvl(zoom: number) {
      this.zoomlvl = zoom;
    },
  },
  getters: {
    getCenter: (state) => state.center,
    getZoom: (state) => state.zoomlvl,
    getCurrentLocation: (state) => state.currentLocation,
    getSelections: (state) => state.filterPanelSelections,
    getPathSelections: (state) => state.pathSelections,
  },
});
