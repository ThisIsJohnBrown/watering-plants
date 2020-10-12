// import { plants } from "../../data/plants";

export const PlantsModule = {
  namespaced: true,
  state: {
    plants: null,
  },

  mutations: {
    SET_LEVEL(state, params) {
      state.plants[params.id].level = params.level;
    },
    // SET_PLANT_NAME(state, params) {
    //   // state.
    // },
    SET_PLANTS(state, plants) {
      state.plants = plants;
    },
  },

  actions: {
    setLevel({ commit }, params) {
      commit("SET_LEVEL", params);
    },
    setPlants({ commit }, plants) {
      commit("SET_PLANTS", plants);
    },
  },
};
