<template>
  <!-- <div class="cardd">Magic card</div> -->
  <dialog class="" ref="dialog" style="min-width: 20%">
    <div class="">
      <h1>
        Filter Panels
        <span @click="addLocation" class="addIcon"><IconMdi:plus /></span>
      </h1>
      <div v-if="!showAddLocation">
        <div v-for="(panel, i) in panels" :key="i" class="mdl-button">
          <slot name="filterPanel">
            <FilterPanel :panel="panel" :panelType="panel.type" />
          </slot>
        </div>
      </div>
      <div v-else>
        <AddLocation />
      </div>
    </div>
    <div style="display: flex">
      <button type="button" class="mdl-button" @click="closeClickHandler">
        Close
      </button>
      <button type="button" class="mdl-button" @click="save">Save</button>
    </div>
  </dialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { IFilterPanel, topLvlGeos } from "~~/models";
import FilterPanel from "./FilterPanel/filterPanel.vue";
const emit = defineEmits(["close"]);

interface Props {
  open?: string | number | boolean;
}
const dialog = ref(null);
let showAddLocation = ref(false);
// micro compiler
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const panels: IFilterPanel[] = [
  {
    type: "location",
    title: "Locations",
    icon: "any",
    children: topLvlGeos,
    childrenLength: 12,
  },
  {
    type: "friends",
    title: "Friends",
    icon: "any",
    children: [
      { name: "mike" },
      { name: "tiff" },
      { name: "lily" },
      { name: "walter" },
      { name: "anna" },
    ],
    childrenLength: 12,
  },
];

watch(
  () => props.open,
  (newValue: Props["open"]) => {
    if (newValue) {
      // dialog.showModal()
      dialog.value.showModal();
    } else {
      closeClickHandler();
    }
  }
);

const closeClickHandler = () => {
  dialog.value.close();
  emit("close");
};
const showClickHandler = (event) => {
  dialog.value.showModal();
};

const addLocation = () => {
  showAddLocation.value = true;
};
const saveAddLocation = () => {
  showAddLocation.value = false;
  console.log(censusGeoCode);
};

const save = () => {
  console.log("save");
};

const verifyLocation = () => {
  console.log(censusGeoCode);
};
</script>

<style lang="scss">
.addIcon {
  cursor: pointer;
}
.addIcon :hover {
  background-color: grey;
  border-radius: 2px;
}
.mdl-button {
  background: #ebe7e7;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
  text-align: center;
  &:hover {
    background: #cfcbcb;
  }
}
</style>
