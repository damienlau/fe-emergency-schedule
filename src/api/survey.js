import request from "../utils/request";

// 勘察信息
//

// 获取全部勘查信息记录
export function getSurveyInfos(filterData) {
  return request.get("/survey/all", { params: filterData });
}

// 查找勘查信息记录
export function searchSurveyInfo() {
  return request.get("/survey/find");
}
