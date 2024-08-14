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

async function checkNicknameAvailability(nickname, success, fail) {
  await local.post(`user/nickname/check/${nickname}`).then(success).catch(fail);
}

async function checkEmailAvailability(email, success, fail) {
  await local.post(`user/email/check/${email}`).then(success).catch(fail);
}

async function checkNumberAvailability(phoneNumber, success, fail) {
  await local
    .post(`user/phoneNumber/check/${phoneNumber}`)
    .then(success)
    .catch(fail);
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
  checkEmailAvailability,
  checkNumberAvailability,
};
