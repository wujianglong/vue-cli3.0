import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/",
      name: "Layout",
      component: () => import("@/views/Layout.vue"),
      children: [
        {
          path: "role",
          name: "role",
          component: () => import("@/views/Role.vue")
        },
        {
          path: "product",
          name: "product",
          component: () => import("@/views/Product.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue")
    },
    {
      path: "/about",
      name: "about",
      meta: {
        requireAuth: true
      },
      component: () => import("@/views/About.vue")
    }
  ]
});
