// 所有接口
import ask from "./config";

let baseApiUrl;
if (process.env.NODE_ENV === "development") {
  baseApiUrl = "http://dev.txgg.zonst.org/api";
} else {
  baseApiUrl = "http://dev.txgg.zonst.org/api";
}

export default {
  // 用户登录  请求地址是否跨域确认下
  login(params) {
    return ask.askPost(baseApiUrl + "/login/", params);
  },
  // 更新用户信息
  updateUser(params) {
    return ask.askPost(baseApiUrl + "/user", params);
  },
  // 创建用户信息
  createUser(params) {
    return ask.askPost(baseApiUrl + "/user", params);
  },
  // 删除用户信息
  deleteUser(params) {
    return ask.askPost(baseApiUrl + "/user", params);
  },
  // 获取用户信息
  getUser(params) {
    return ask.askPost(baseApiUrl + "/user", params);
  }
};
