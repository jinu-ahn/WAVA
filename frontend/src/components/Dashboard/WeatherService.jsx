import axios from "axios";

const CACHE_DURATION = 10 * 60 * 1000; // 10분
let cachedWeather = null;
let lastFetchTime = 0;
let cachedLocation = null;

const FALLBACK_LOCATION = { latitude: 37.5665, longitude: 126.978 }; // 서울의 좌표

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (cachedLocation) {
      resolve(cachedLocation);
      return;
    }

    if (!navigator.geolocation) {
      resolve(FALLBACK_LOCATION);
      return;
    }

    const successCallback = (position) => {
      cachedLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      resolve(cachedLocation);
    };

    const errorCallback = (error) => {
      console.warn(`ERROR(${error.code}): ${error.message}`);
      resolve(FALLBACK_LOCATION);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 10000, // 10초로 증가
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  });
};

export const getWeatherStatus = async (lat, lng) => {
  const currentTime = Date.now();
  if (cachedWeather && currentTime - lastFetchTime < CACHE_DURATION) {
    return cachedWeather;
  }

  try {
    const appkey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${appkey}&lang=kr&units=metric`
    );
    if (response.status === 200) {
      cachedWeather = response.data;
      lastFetchTime = currentTime;
      return cachedWeather;
    }
  } catch (e) {
    console.error("날씨 정보 에러: ", e);
    throw e;
  }
};
