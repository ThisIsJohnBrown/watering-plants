<template>
  <div class="plant" v-bind:style="backgroundCSS()">
    <div class="plant__buttons">
      <button @click="setLevel(10)">+</button>
      <button @click="setLevel(-10)">-</button>
    </div>
    <div class="plant__name">
      <router-link
        class="plant-link"
        :to="{ name: 'Plant', params: { plantId: plant.id } }"
      >
        {{ plant.name }}
      </router-link>
    </div>
    <div class="plant__level">{{ plant.level }}</div>
  </div>
</template>

<script>
// import { computed } from "vue";
import { useStore } from "vuex";
import eventbus from "../eventbus";

export default {
  name: "PlantListItem",
  props: {
    plant: Object,
  },
  setup(props) {
    const store = useStore();
    const setLevel = level => {
      let computedLevel = props.plant.level + level;
      if (computedLevel < 0) computedLevel = 0;
      if (computedLevel > 100) computedLevel = 100;
      eventbus.emit("setLevel", { level: computedLevel, id: props.plant.id });
      store.dispatch("Plants/setLevel", {
        id: props.plant.id,
        level: computedLevel,
      });
    };

    const backgroundCSS = () => {
      let color = props.plant.level <= 50 ? "orange" : "green";
      color = props.plant.level <= 20 ? "red" : color;
      return {
        background: `linear-gradient(0deg, ${color} 0%, ${color} ${props.plant.level}%, rgba(0,0,0,0) ${props.plant.level}%)`,
      };
    };

    return { setLevel, backgroundCSS };
  },
};
</script>

<style lang="scss" scoped>
.plant {
  a {
    text-decoration: none;
    color: black;
  }

  .plant__name {
    font-size: 4em;
  }
}
</style>
