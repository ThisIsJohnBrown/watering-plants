<template>
  <router-link :to="{ name: 'Home' }">
    <div id="app">
      Watering Plants
    </div>
  </router-link>
  <router-view />
</template>

<script>
import { useStore } from "vuex";
import eventbus from "./eventbus";
import { connection, sendEvent } from "./socket";

export default {
  name: "App",

  setup() {
    const store = useStore();
    store;

    const updatePlants = data => {
      store.dispatch("Plants/setPlants", data.data.plants);
    };

    connection.onmessage = event => {
      if (event.type === "message") {
        const data = JSON.parse(event.data);
        if (data.event === "updatePlants") {
          updatePlants(data);
        } else if (data.event === "updateReadings") {
          // eventbus.emit("updateReadings", data);
        }
      }
    };

    eventbus.on("setLevel", data => {
      sendEvent("setLevel", data);
    });

    eventbus.on("setPlantInfo", data => {
      console.log(data);
      sendEvent("setPlantInfo", data);
    });

    return {};
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
