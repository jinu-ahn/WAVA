import { localAxios as local } from "../util/http-commons";

// const local = localAxios();

// 사용자 회원가입
async function register(newUser, success, fail) {
  await local.post(`user/signup`, newUser).then(success).catch(fail);
}

async function login(user, success, fail) {
  await local.post(`user/login`, user).then(success).catch(fail);
}

async function logout(userInfo, success, fail) {
  await local.post(`user/logout`, null, userInfo).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  await local.post(`user/reissue`, user).then(success).catch(fail);
}

// 닉네임 가용성 확인을 위한 임시 모의 함수
// async function checkNicknameAvailability(nickname, success, fail) {
//   // 실제 API 호출 대신 임시 로직 사용
//   // 아래 부분 실제 함수로 변경하기
//   setTimeout(() => {
//     // 임의로 "test"와 "admin"을 사용 중인 닉네임으로 설정
//     if (nickname === "test" || nickname === "admin") {
//       fail({ response: { data: { msg: "이미 사용 중인 닉네임입니다." } } });
//     } else {
//       success({ data: { msg: "사용 가능한 닉네임입니다." } });
//     }
//   }, 500);
// }

async function checkNicknameAvailability(nickname, success, fail) {
  await local.post(`user/nickname/check/${nickname}`).then(success).catch(fail);
}
// async function checkNicknameAvailability(nickname, success, fail) {
//   try {
//     const response = await local.post(`user/nickname/check/${nickname}`);
//     success(response);
//   } catch (error) {
//     fail(error);
//   }
// }

export {
  register,
  login,
  logout,
  tokenRegeneration,
  checkNicknameAvailability,
};
