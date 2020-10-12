<template>
  <div v-if="plant">
    <div class="plant-info" v-if="!state.editing">
      <h1>{{ plant.name }}</h1>
      <p>Species: {{ plant.species }}</p>
      <p>Floor: {{ plant.floor }}</p>
      <p>Room: {{ plant.room }}</p>
      <button @click="edit">Edit</button>
    </div>
    <form v-if="state.editing">
      <h2>Plant info</h2>
      <label for="#name">Plant name:</label>
      <input id="name" v-model="state.plant.name" />
      <label for="#species">Species:</label>
      <input id="species" v-model="state.plant.species" />
      <h2>Plant location</h2>
      <label for="#floor">Floor:</label>
      <input id="floor" v-model="state.plant.floor" />
      <label for="#room">Room:</label>
      <input id="room" v-model="state.plant.room" />
      <button @click.prevent="save">Save</button>
    </form>
    <Chart :plantId="state.plant.id" />
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import eventbus from "../eventbus";
import Chart from "../components/Chart";

export default {
  name: "Plant",
  setup() {
    const route = useRoute();
    const plantId = computed(() => route.params.plantId);

    const store = useStore();
    const plant = computed(() => {
      if (store.state.Plants.plants)
        return store.state.Plants.plants[plantId.value];
    });

    const state = reactive({
      plant,
      editing: false,
    });

    const edit = () => {
      state.editing = true;
    };

    const save = () => {
      state.editing = false;
      eventbus.emit("setPlantInfo", {
        name: state.plant.name,
        id: plant.value.id,
      });
    };

    return {
      plant,
      state,
      edit,
      save,
      Chart,
    };
  },
};
</script>

<style></style>
