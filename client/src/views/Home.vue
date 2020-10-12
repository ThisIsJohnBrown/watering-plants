<template>
  <div class="home">
    Home
    <PlantsList />
  </div>
</template>

<script>
import PlantsList from "../components/PlantsList";

export default {
  name: "Home",

  setup() {
    return {
      PlantsList,
    };
  },
};
</script>

<style lang="scss" scoped></style>
