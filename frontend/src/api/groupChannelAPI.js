// import { localAxios as local } from "../util/http-commons";

// const createGroupChannelAPI = async (channelName, success, fail) => {
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

// export { createGroupChannelAPI };
import { localAxios as local } from "../util/http-commons";

import { handleRequest } from "./helper";

const address = "/channel";
// 그룹 채널 서비스 객체
const createGroupChannelAPI = {
  getAllChannelList: async () => {
    return await handleRequest(() => local.get(address), "채널 전체 가져오기");
  },

  // 채널 정보 가져오기
  getChannelInfo: async (channelId) => {
    return await handleRequest(
      () => local.get(`/channels/${channelId}`),
      "채널 정보 가져오기"
    );
  },

  // 채팅 메시지 가져오기
  getChatMessages: async (channelId) => {
    return await handleRequest(
      () => local.get(`/channels/${channelId}/messages`),
      "그룹 채팅 메시지 가져오기"
    );
  },

  // 새 메시지 보내기
  sendMessage: async (channelId, message) => {
    return await handleRequest(
      () => local.post(`/channels/${channelId}/messages`, { message }),
      "새 메시지 보내기"
    );
  },

  // 위치 검색
  searchLocation: async (query) => {
    return await handleRequest(
      () => local.get(`/search`, { params: { query } }),
      "위치 검색"
    );
  },

  // 그룹 채널 생성
  createGroupChannel: async (channelName) => {
    return await handleRequest(
      () =>
        local.post(`/channels/group`, {
          name: channelName,
        }),
      "그룹 채널 생성"
    );
  },
};

export { createGroupChannelAPI };
