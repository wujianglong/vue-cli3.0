import api from "../api/api";
export default {
  state: {
    userInfo: {},
    examList: {}
  },
  mutations: {
    userInfo(state, res) {
      state.userInfo = res;
    },
    examList(state, res) {
      state.examList = res;
    }
  },
  getters: {},
  actions: {
    getExam({ commit }, obj) {
      api
        .getExam({
          params: obj
        })
        .then(res => {
          commit("examList", res);
        });
    },
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
