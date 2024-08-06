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
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  }
  // (error) => Promise.reject(error)
);

export { localAxios };
