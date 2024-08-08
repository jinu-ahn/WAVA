import { localAxios as local } from "../util/http-commons";

const address = "/channel";

// try-catch 헬퍼함수
const handleRequest = async (requestFunction) => {
  try {
    const response = await requestFunction();
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 202 ||
      response.status === 204
    ) {
      return response.data || true;
    } else if (response?.data?.message) {
      throw new Error(response?.data?.message);
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    console.error("feed Error" + error);
    return false;
  }
};

/**
 * @typedef {Object} Image
 * @property {string} imageName - 이미지의 이름
 * @property {string} imageUrl - 이미지의 URL

 * @typedef {Object} FeedItem
 * @property {number} id - 피드 항목의 고유 ID
 * @property {Image} image - 피드의 대표 이미지 정보
 * @property {number} likes - 피드 항목의 좋아요 수
 * @property {number} comments - 피드 항목의 댓글 수
 * @property {string} owner - 피드 소유자의 이메일 또는 이름

 * @typedef {Object} feedReturn
 * @property {boolean} hasMore - 다음 페이지가 존재하는지 여부
 * @property {number} currentPage - 현재 페이지 번호
 * @property {number} totalPages - 전체 페이지 수
 * @property {FeedItem[]} data - 피드 데이터 배열

 * 피드 콘텐츠(이미지들)를 가져오기 위한 요청을 처리합니다.
 *
 * @param {number} id - 가져올 피드의 ID
 * @returns {Promise<feedReturn>} 피드 콘텐츠를 포함한 객체를 반환합니다
 */
export const readFeedContentRequest = async (id, pageNo = 1) => {
  // return get_feedData;
  return await handleRequest(() =>
    local.get(address + "/personal/" + id + "/feed?pages=" + pageNo)
  );
};

// 개인 채널의  정보
export const readFeedInfoRequest = async (id) => {
  return await handleRequest(() =>
    local.get(address + "/personal/" + id + "/info")
  );
};

// 헤더 덮어씌워서 명시적으로 지정
// 피드 생성
export const createFeedRequest = async (data) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    return await handleRequest(() =>
      local.post(address + "/feed/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
    );
  } else {
    return false;
  }
};

// 피드 디테일 보기
export const readOneFeedDetailRequest = async (id) => {
  return await handleRequest(() => local.get(address + "/feed/" + id));
};

// 피드에 코멘트 작성
export const createCommentFeedRequest = async (id, data) => {
  return await handleRequest(() =>
    local.post(`${address}/feed/${id}/comment`, data)
  );
};

// 피드 좋아요
export const createLikeFeedRequest = async (id) => {
  return await handleRequest(() => local.post(`${address}/feed/${id}/like`));
};

// 피드 좋아요 취소
export const deleteLikeFeedRequest = async (id) => {
  return await handleRequest(() =>
    local.delete(`${address}/feed/${id}/dislike`)
  );
};

// 피드 검색 -> 에러 핸들링 할 것 ->마지막페이지, 페이지아웃
export const searchFeedRequest = async (keyword = "", page = 0) => {
  // return get_feedData.data;

  return await handleRequest(() =>
    local.get(`${address}/feed/search?page=${page}&content=${keyword}`)
  );
};

// 팔로우 등록
export const followRequest = async (channelId) => {
  return await handleRequest(() =>
    local.post(`${address}/follow`, { channelId })
  );
};

// 팔로우 상세
export const readFollowUserRequest = async (nickName) => {
  return await handleRequest(() =>
    local.get(`${address}/${nickName}/follower`)
  );
};

// 팔로워 상세
export const readFollowerUserRequest = async (nickName) => {
  return await handleRequest(() =>
    local.get(`${address}/${nickName}/followering`)
  );
};

// 헤더 덮어씌워서 명시적으로 지정
// 프로필 이미지 저장
export const createProfileImageRequest = async (data) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    return await handleRequest(() =>
      local.post(`/channel/personal/profile`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
    );
  } else {
    return false;
  }
};

// 개인 채널 설명 변경
export const updateFeedDescription = async (desc) => {
  return await handleRequest(() =>
    local.patch(`${address}/personal/description`, { description: desc })
  );
};

// 개인 피드 삭제
export const deleteFeedRequest = async (feedId) => {
  return await handleRequest(() =>
    local.delete(`${address}/feed/${feedId}/delete`)
  );
};
