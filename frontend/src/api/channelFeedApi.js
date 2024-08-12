import { localAxios as local } from "../util/http-commons";
import { handleRequest } from "./helper";

const address = "/channel";

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
  return await handleRequest(
    () => local.get(address + "/personal/" + id + "/feed?pages=" + pageNo),
    "피드 가져오기"
  );
};

// 개인 채널의  정보
export const readFeedInfoRequest = async (id) => {
  return await handleRequest(
    () => local.get(address + "/personal/" + id + "/info"),
    "피드 인포 가져오기"
  );
};

// 헤더 덮어씌워서 명시적으로 지정
// 피드 생성
export const createFeedRequest = async (data) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    return await handleRequest(
      () =>
        local.post(address + "/feed/create", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }),
      "피드 생성"
    );
  } else {
    return false;
  }
};

// 피드 디테일 보기
export const readOneFeedDetailRequest = async (id) => {
  return await handleRequest(
    () => local.get(address + "/feed/" + id),
    "피드 디테일 보기"
  );
};

// 피드에 코멘트 작성
export const createCommentFeedRequest = async (id, data) => {
  return await handleRequest(
    () => local.post(`${address}/feed/${id}/comment`, data),
    "피드 코멘트 작성"
  );
};

// 피드 좋아요
export const createLikeFeedRequest = async (id) => {
  return await handleRequest(
    () => local.post(`${address}/feed/${id}/like`),
    "피드 좋아요"
  );
};

// 피드 좋아요 취소
export const deleteLikeFeedRequest = async (id) => {
  return await handleRequest(
    () => local.delete(`${address}/feed/${id}/dislike`),
    "피드 좋아요 취소"
  );
};

// 피드 검색
export const searchFeedRequest = async (keyword = "", page = 0) => {
  return await handleRequest(
    () => local.get(`${address}/feed/search?page=${page}&content=${keyword}`),
    "피드 검색"
  );
};

// 팔로우 등록
export const followRequest = async (nickName) => {
  return await handleRequest(
    () => local.post(`${address}/follow/${nickName}/follow`),
    "팔로우 등록"
  );
};

// 팔로우 해제
export const unfollowRequest = async (nickName) => {
  return await handleRequest(
    () => local.delete(`${address}/follow/${nickName}/unfollow`),
    "팔로우 해제"
  );
};

// 팔로우? 상세
export const readFollowUserRequest = async (nickName) => {
  // console.log(nickName);
  return await handleRequest(
    () => local.get(`${address}/follow/${nickName}/follower`),
    "팔로워 상세"
  );
};

// 팔로워? 상세
export const readFollowerUserRequest = async (nickName) => {
  return await handleRequest(
    () => local.get(`${address}/follow/${nickName}/following`),
    "팔로잉 상세"
  );
};

// 헤더 덮어씌워서 명시적으로 지정
// 프로필 이미지 저장
export const createProfileImageRequest = async (data) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    return await handleRequest(
      () =>
        local.patch(`/channel/personal/profile`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }),
      "프사 저장"
    );
  } else {
    return false;
  }
};

// 개인 채널 설명 변경
export const updateFeedDescription = async (desc) => {
  return await handleRequest(
    () => local.patch(`${address}/personal/description`, { description: desc }),
    "채널 설명 저장"
  );
};

// 개인 피드 삭제
export const deleteFeedRequest = async (feedId) => {
  return await handleRequest(
    () => local.delete(`${address}/feed/${feedId}/delete`),
    "개인 피드 삭제"
  );
};
