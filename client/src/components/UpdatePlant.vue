<template>
  <form>
    <input id="name" placeholder="Plant name" v-model="state.name" />
    <button @click.prevent="checkDetails">Add new plant!</button>
  </form>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "UpdatePlant",
  setup() {
    const state = reactive({
      name: "tester",
      //   floor: 2,
      //   room: "Bedroom",
      //   species: "Cactus",
      //   level: 20,
    });

    const checkDetails = () => {
      console.log();
    };

    return {
      checkDetails,
      state,
    };
  },
};
</script>

<style></style>
