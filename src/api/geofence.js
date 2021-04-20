import request from "../utils/request";

// 新增电子围栏
export function createGeoFence(fence) {
  return request.post("/fence/info/add", fence);
}

// 获取全部电子围栏
export function getGeoFences() {
  return request.get("/fence/info/all");
}

// 获取全部电子围栏动态
export function getGeoFenceInfos() {
  return request.get("/fence/warn/log/all");
}
