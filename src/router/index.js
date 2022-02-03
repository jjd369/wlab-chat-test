import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout.Default,
    // children:[]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
