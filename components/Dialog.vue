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
import { endpoints } from "~~/api/endpoints";
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

let dataObjects: any[] = [];
let objectTypes: string[] = [];

let panels: IFilterPanel[] = [
  {
    type: "location",
    title: "Locations",
    icon: "any",
    children: topLvlGeos,
    childrenLength: 12,
  },
];

const groupBy = function (xs: any[], key: string) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const getObjects = async () => {
  const variables = {};
  const query = `query GetObjects {
                getObjects {
                  count
                  dataObjects{
                    id
                    name
                    properties
                  }
                }
              }`;
  const data = await endpoints.pingGraphql(query, variables);
  if (data?.data?.getObjects) {
    dataObjects = data?.data?.getObjects?.dataObjects;
    objectTypes = [];
    const groups = groupBy(data?.data?.getObjects?.dataObjects, "name");

    Object.keys(groups).forEach((key) => {
      const group = {
        type: "object",
        title: key,
        icon: "any",
        children: groups[key].map((e: any) => {
          return {
            type: "object",
            name: e.properties["display-name"],
            properties: e.properties,
          };
        }),

        childrenLength: groups[key].length,
      };
      panels.push(group);
    });

    data?.data?.getObjects?.dataObjects.forEach((d: any) => {
      objectTypes.push(d.name);
    });
  } else {
  }
};
onMounted(async () => {
  await getObjects();
}),
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
