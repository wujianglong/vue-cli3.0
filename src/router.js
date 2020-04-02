import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  path: "/",
  base: "/",
  routes: [{
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
      meta: {
        requireAuth: true
      },
      component: () =>
        import ("@/views/About.vue")
    },
    {
      path: "/result",
      name: "result",
      component: () =>
        import ("@/views/Result.vue")
    }
  ]
});