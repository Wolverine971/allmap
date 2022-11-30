<template>
  <div>
    <div>
      <button @click="expandPanel" class="flexit">
        <input
          v-if="panel.type === 'selection'"
          :checked="checked"
          type="checkbox"
          @click="selected"
        />
        {{ panel.title || panel.name }}
        <span v-if="panel.children?.length && !showChildren">
          <IconMdi:chevronRight />
        </span>
        <span v-else-if="panel.children?.length && showChildren">
          <IconMdi:chevronDown />
        </span>
      </button>
    </div>
    <div v-if="dropDown && panel.properties" class="info">
      <p v-for="(prop, i) in Object.keys(panel.properties)" :key="i" class="">
        {{ prop }}: {{ panel.properties[prop] }}
      </p>
    </div>
    <div v-if="showChildren" class="panel-children">
      <div v-for="(childPanel, i) in panel.children" :key="i">
        <slot name="cfilterPanel">
          <FilterPanel
            :panel="childPanel"
            :panelType="panel.type"
            :withinId="CurrentGeoWithin.id"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { geosWithin } from "../../api/geos";
import { useMyStore, IFilterPanelSelection } from "../../stores/useStore";
import { storeToRefs } from "pinia";
import { IFilterPanel } from "../../models/index";
import { ref, reactive, watch } from "vue";
interface Props {
  panelType?: string;
  panel: IFilterPanel;
  withinId?: string;
}
const props = defineProps<Props>();
const store = useMyStore();
// setup() {
//     const store = useMyStore();

//     return {
// pathSelections: store.pathSelections,
//         filterPanelSelections: store.filterPanelSelections
//      }
//   },
const selectedWithinId = ref(props.withinId);
watch(selectedWithinId, (id, second) => {
  if (store.pathSelections.includes(id || "")) {
    store.filterPanelSelections.forEach((selection: IFilterPanelSelection) => {
      if (selection.selection === props.panel.name) {
        checked.value = true;
      }
    });
  }
});

let CurrentGeoWithin = useState<any>("filterPanel.CurrentGeoWithin", () => {
  return {
    g: "",
    q: "",
    size: 100,
    id: "",
    within: "",
  };
});
let showChildren = ref(false);

let dropDown = ref(false);
const currentLocation = useState<[number, number] | null>(
  "navbar.currentLocation",
  () => null
);
let checked = ref(false);
const { center } = storeToRefs(store);
onMounted(async () => {
  if (store.pathSelections.includes(props.withinId || "")) {
    store.filterPanelSelections.forEach((selection: IFilterPanelSelection) => {
      if (selection.selection === props.panel.name) {
        checked.value = true;
      }
    });
  }
});

const expandPanel = async () => {
  console.log("expand");
  if (props.panel.type !== "selection") {
    if (
      (props.panel.type === "path" || props.panel.type === "location") &&
      !props.panel.children?.length
    ) {
      if (props.panel.type === "path") {
        CurrentGeoWithin.value = {
          g: "",
          q: "",
          size: 100,
          id: props.panel.code,
          within: "",
        };
      } else if (props.panel.type === "location") {
        CurrentGeoWithin.value = {
          ...CurrentGeoWithin.value,
          within: props.panel.code,
        };
      }
      let resp = await geosWithin(CurrentGeoWithin.value);
      if (resp.geos.leafNode) {
        props.panel.children = resp.geos.items.map((item: any) => {
          return { ...item, type: "selection" };
        });
      } else {
        props.panel.children = resp.geos.items.map((item: any) => {
          return { ...item, type: "location" };
        });
      }
    }
    showChildren.value = !showChildren.value;

    if (props.panel.type === "object") {
      dropDown.value = !dropDown.value;
    }
  }
};

const selected = async () => {
  console.log(props.panel.name);
  store.addFPSelection({
    id: CurrentGeoWithin.value.id,
    geos: [],
    selection: props.panel.name,
  } as IFilterPanelSelection);
};
</script>
<style>
.flexit {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-left: 5px;
}
.panel-children {
  overflow-y: scroll;
  overflow-x: hidden;
  margin-left: 10px;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 10px;
}
</style>
