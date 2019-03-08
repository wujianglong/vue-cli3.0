import api from "../api/api";
export default {
  state: {
    userInfo: {}
  },
  mutations: {
    userInfo(state, res) {
      state.userInfo = res;
    }
  },
  getters: {},
  actions: {
    userInfo({ commit }, obj) {
      return new Promise(resolve => {
        api.login(obj).then(res => {
          if (String(res.err_no) === "0") {
            commit("userInfo", res);
            localStorage.setItem("token", res.token);
          }
          resolve(res);
        });
      });
    }
  }
};