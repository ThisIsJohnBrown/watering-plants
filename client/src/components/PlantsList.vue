<template>
  <div class="plant-list">
    <PlantListItem
      v-for="plant in plants"
      :key="plant.id"
      v-bind:plant="plant"
    />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PlantListItem from "./PlantListItem";

export default {
  name: "PlantsList",
  setup() {
    const store = useStore();
    const plants = computed(() => store.state.Plants.plants);

    return { plants, PlantListItem };
  },
};
</script>

<style lang="scss" scoped>
.plant-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px 10px;
}
</style>
