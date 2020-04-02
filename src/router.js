import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: "/",
  routes: [{
    path: "/",
    component: () =>
      import ("@/views/Layout.vue"),
    children: [{
        path: "/test",
        name: "Test",
        component: () =>
          import ("@/views/Test.vue")
      },
      {
        path: "/",
        name: "login",
        component: () =>
          import ("@/views/Login.vue")
      },
      {
        path: "/about",
        name: "about",
        component: () =>
          import ("@/views/About.vue")
      },
      {
        path: "/result",
        name: "result",
        component: () =>
          import ("@/views/Test.vue")
      }
    ]
  }]
});