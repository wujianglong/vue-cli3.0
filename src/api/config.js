import axios from "axios";
import router from "../router";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

// 请求拦截器
axios.interceptors.request.use(
  request => {
    // 登录页面不要token 可如下设置
    // if (router.currentRoute.name === "Login") {
    //   return request;
    // }
    // header存入token信息
    if (localStorage.getItem("token")) {
      request.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
      return request;
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    switch (error.response.status) {
      case 401:
        // token失效状态码
        localStorage.clear();
        router.replace({
          path: "/login"
        });
        this.$notify({
          title: "警告",
          message: "登录信息失效，请重新登录。",
          type: "warning"
        });
        break;
      default:
        return Promise.reject(error);
    }
    return error;
  }
);

// Post
export default {
  askPost: function(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then(
          response => {
            resolve(response.data);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  },

  // Get
  askGet: function(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, params)
        .then(
          response => {
            resolve(response.data);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  },

  // Patch
  askPatch: function(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .patch(url, params)
        .then(
          response => {
            resolve(response.data);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  },

  // Delete
  askDelete: function(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, params)
        .then(
          response => {
            resolve(response.data);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  }
};