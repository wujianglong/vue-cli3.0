// 所有接口
import ask from "./config";

let baseApiUrl;
if (process.env.NODE_ENV === "development") {
  baseApiUrl = "http://exam_dev.z7z8.cc/api";
} else {
  baseApiUrl = "http://exam_dev.z7z8.cc/api";
}

export default {
  // 获取试题信息
  getPaper(params) {
    return ask.askGet(baseApiUrl + "/paper/", params);
  },
  // 提交答卷
  submit(params) {
    return ask.askPost(baseApiUrl + "/paper/", params);
  },
  // 提交用户信息
  user(params) {
    return ask.askPost(baseApiUrl + "/user/", params);
  },
  // code有效性验证
  validate(params) {
    return ask.askGet(baseApiUrl + "/code_status/", params);
  }
};
