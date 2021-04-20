import request from "../utils/request";

// 用户登录
export function Login(data) {
  return request.post("/user/login", data);
}

// 用户注销
export function Logout() {
  return request.get("/user/loginOut");
}
