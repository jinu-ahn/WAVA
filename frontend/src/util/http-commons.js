import axios from "axios";

// function localAxios() {
//   const instance = axios.create({
//     baseURL: process.env.REACT_APP_SERVER_ADDRESS,
//   });
//   instance.defaults.headers.common["Authorization"] = "";
//   instance.defaults.headers.common["Content-Type"] = "application/json";

//   return instance;
// }

// export { localAxios };

// 싱글턴 패턴으로 axios 인스턴스 생성
const localAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정
localAxios.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰을 읽어오기
    const token = sessionStorage.getItem("accessToken");

    console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => console.log(error)
  // (error) => Promise.reject(error)
);

// // 응답 인터셉터 설정
// localAxios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // 401 Unauthorized: 토큰 만료 혹은 인증 실패
//     if (error.response.status === 401) {
//       console.log('토큰이 만료되었습니다.');

//       // 토큰을 갱신하는 비동기 함수 호출 예시
//       return refreshToken().then(newToken => {
//         // 새 토큰으로 axios config 설정
//         error.config.headers['Authorization'] = `Bearer ${newToken}`;
//         // 새 토큰으로 원래 요청 재시도
//         return axios.request(error.config);
//       });
//     }
//     return Promise.reject(error);
//   }
// );

// function refreshToken() {
//   // 토큰을 갱신하는 로직을 작성
//   // 예를 들어, 서버에서 새 토큰을 발급받는 API 호출 등
//   return axios.post('/api/refresh_token')
//     .then(response => response.data.token);
// }

export { localAxios };
