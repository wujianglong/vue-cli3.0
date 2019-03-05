// 所有接口
import ask from "./config";

let baseApiUrl;
if (process.env.NODE_ENV === "development") {
  baseApiUrl = "https://clientsrv.duoduocp.cn/v1";
} else {
  baseApiUrl = "https://clientsrv.duoduocp.cn/v1";
}

export default {
  // 用户登录  请求地址是否跨域确认下
  login(params) {
    return ask.askPost(baseApiUrl + "/client/user/login", params);
  }
};