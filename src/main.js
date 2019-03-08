import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import api from "./api/api.js";

// 引入element-ui组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";

// 引入自定义icon
import "@/assets/icon/iconfont.css";

// 引入全局样式global.styl
import "@/assets/css/global.styl";
Vue.use(ElementUI);

// 阻止启动生产提示
Vue.config.productionTip = false;

// 全局调用api
Vue.prototype.$api = api;

// 全局调用store
Vue.prototype.$store = store;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// 钩子函数路由判断
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.token) {
      next();
    } else {
      next({
        path: "/login",
        // 带上参数登录后根据参数返回原页面
        query: { redirect: router.currentRoute.fullPath }
      });
    }
  } else {
    next();
  }
});
