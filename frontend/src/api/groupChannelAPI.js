// import { localAxios as local } from "../util/http-commons";

// const groupChannelAPI = async (channelName, success, fail) => {
//   try {
//     const response = await local.post("/api/channels/group", {
//       name: channelName,
//     });
//     success(response.data);
//   } catch (error) {
//     console.error("그룹 채널 생성 중 오류 발생:", error);
//     fail(error);
//   }
// };

// export { groupChannelAPI };
import { localAxios as local } from "../util/http-commons";

import { handleRequest } from "./helper";

const address = "/channel";
// 그룹 채널 서비스 객체
const groupChannelAPI = {
  // 내가 가입한 채널 보기
  getMyChannel: async () => {
    return await handleRequest(() => local.get(address + "/userchannel"));
  },

  // 채널 전체 가져오기
  getAllChannelList: async () => {
    return await handleRequest(() => local.get(address), "채널 전체 가져오기");
  },

  // 채널 검색
  getSearchedChannelList: async (keyword) => {
    return await handleRequest(
      () => local.get(address + "/search"),
      "채널 검색하기"
    );
  },

  // 그룹 채널 생성
  createGroupChannel: async (data) => {
    return await handleRequest(
      () => local.post(`${address}/create`, data),
      "그룹 채널 생성"
    );
  },

  // 채널 정보 가져오기-방/유저
  getChannelInfo: async (channelId) => {
    return await handleRequest(
      () => local.get(`${address}/info/${channelId}`),
      "채널 정보 가져오기"
    );
  },

  // 채널 핀 정보 가져오기
  getChannelMapsData: async (channelId) => {
    return await handleRequest(() =>
      local.get(`${address}/detail/${channelId}`)
    );
  },

  // 그룹 채널 메모 업데이트 - 디플리케이트?
  updateGroupDesc: async (channelId, data) => {
    return await handleRequest(
      () => local.patch(address + "/update/" + channelId, data),
      "그룹 채널 메모 업데이트"
    );
  },

  // 그룹 채널 참가하기
  joinGroupRequest: async (channelId) => {
    return await handleRequest(
      () => local.post(address + "/join", channelId),
      "그룹 채널 참가하기"
    );
  },

  // 지도 핀 등록
  addMapPinRequest: async (data) => {
    return await handleRequest(() => local.post(address + "/map", data));
  },
  /* 지도 핀 데이터
  {
    "channelId" : Number,
    "lat" : "float",
    "lng" : "float",
    "placeName" : "string",
    "info" : "string",
    "pinOrder" : Number,
    "user" : [
      {
        "userId" : Number
      },
      {
        "userId" : Number
      }, ...
    ]
  }
*/

  // 지도 핀 수정
  updateMapPinRequest: async (pinId, data) => {
    return await handleRequest(() =>
      local.patch(`${address}/map/${pinId}/update`, data)
    );
  },

  // 지도 핀 삭제
  deleteMapPinRequest: async (pinId) => {
    return await handleRequest(() =>
      local.delete(`${address}/map/${pinId}/delete`)
    );
  },

  // // 채팅 메시지 가져오기
  // getChatMessages: async (channelId) => {
  //   return await handleRequest(
  //     () => local.get(`/channels/${channelId}/messages`),
  //     "그룹 채팅 메시지 가져오기"
  //   );
  // },

  // // 새 메시지 보내기
  // sendMessage: async (channelId, message) => {
  //   return await handleRequest(
  //     () => local.post(`/channels/${channelId}/messages`, { message }),
  //     "새 메시지 보내기"
  //   );
  // },

  // // 위치 검색
  // searchLocation: async (query) => {
  //   return await handleRequest(
  //     () => local.get(`/search`, { params: { query } }),
  //     "위치 검색"
  //   );
  // },
};

export { groupChannelAPI };
