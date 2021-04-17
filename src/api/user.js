import request from "../utils/request";

export function Login(data) {
  return request.post("/user/login", data);
}
