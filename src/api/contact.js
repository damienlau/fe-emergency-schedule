import request from "../utils/request";

// 新增救援人员
export function createContactMember(member) {
  return request.post("/personnel/info/add", member);
}

// 获取全部救援人员
export function getContactMembers() {
  return request.get("/personnel/info/all");
}

// 新增救援小组
export function createContactTeam(group) {
  return request.post("/rescue/group/add", group);
}

// 获取全部救援小组
export function getContactTeams() {
  return request.get("/rescue/group/all");
}
