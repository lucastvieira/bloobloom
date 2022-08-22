import { createRouter, createWebHistory } from "vue-router";
import HomeIndex from "@/views/Home/HomeIndex.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:type?/:gender?",
      name: "HomeIndex",
      component: HomeIndex,
    },
  ],
});

export default router;
