import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import Plant from "../views/Plant";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/plant/:plantId",
    name: "Plant",
    component: Plant,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(store);
  next();
});

export default router;
