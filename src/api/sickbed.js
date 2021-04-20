import request from "../utils/request";

// 新增病床区域
export function createSickBedArea(data) {
  return request.post("/hospitalBed/area/add", data);
}

// 获取全部病床区域
export function getSickBedAreas() {
  return request.get("/hospitalBed/area/all");
}

// 新增病床信息
export function createSickBed(data) {
  return request.post("/hospitalBed/info/add", data);
}
// 获取全部病床信息
export function getSickBeds(filterData) {
  return request.get("/hospitalBed/info/all", { params: filterData });
}
