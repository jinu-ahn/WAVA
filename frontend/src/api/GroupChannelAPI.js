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
import { localAxios } from "../util/http-commons";

const createGroupChannelAPI = {
  // 채널 정보 가져오기
  getChannelInfo: async (channelId, success, fail) => {
    try {
      const response = await localAxios.get(`/channels/${channelId}`);
      success(response.data);
    } catch (error) {
      console.error("채널 정보를 가져오는 데 실패했습니다:", error);
      fail(error);
    }
  },

  // 채팅 메시지 가져오기
  getChatMessages: async (channelId, success, fail) => {
    try {
      const response = await localAxios.get(`/channels/${channelId}/messages`);
      success(response.data);
    } catch (error) {
      console.error("채팅 메시지를 가져오는 데 실패했습니다:", error);
      fail(error);
    }
  },

  // 새 메시지 보내기
  sendMessage: async (channelId, message, success, fail) => {
    try {
      const response = await localAxios.post(
        `/channels/${channelId}/messages`,
        { message }
      );
      success(response.data);
    } catch (error) {
      console.error("메시지 전송에 실패했습니다:", error);
      fail(error);
    }
  },

  // 위치 검색
  searchLocation: async (query, success, fail) => {
    try {
      const response = await localAxios.get(`/search`, { params: { query } });
      success(response.data);
    } catch (error) {
      console.error("위치 검색에 실패했습니다:", error);
      fail(error);
    }
  },

  // 그룹 채널 생성
  createGroupChannel: async (channelName, success, fail) => {
    try {
      const response = await localAxios.post(`/channels/group`, {
        name: channelName,
      });
      success(response.data);
    } catch (error) {
      console.error("그룹 채널 생성 중 오류 발생:", error);
      fail(error);
    }
  },
};

export { createGroupChannelAPI };
