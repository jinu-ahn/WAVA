import axios from "axios";

const CACHE_DURATION = 10 * 60 * 1000; // 10분
const LOCATION_CACHE_KEY = "cached_location";
const WEATHER_CACHE_KEY = "cached_weather";
const FALLBACK_LOCATION = { latitude: 37.5665, longitude: 126.978 }; // 서울의 좌표

export const getLocation = () => {
  return new Promise((resolve) => {
    // 로컬 스토리지에서 캐시된 위치 확인
    const cachedLocation = JSON.parse(localStorage.getItem(LOCATION_CACHE_KEY));
    if (
      cachedLocation &&
      Date.now() - cachedLocation.timestamp < CACHE_DURATION
    ) {
      resolve(cachedLocation);
      return;
    }

    if (!navigator.geolocation) {
      resolve(FALLBACK_LOCATION);
      return;
    }

    const successCallback = (position) => {
      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: Date.now(),
      };
      localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(newLocation));
      resolve(newLocation);
    };

    const errorCallback = (error) => {
      console.warn(`위치 정보 오류(${error.code}): ${error.message}`);
      resolve(FALLBACK_LOCATION);
    };

    const options = {
      enableHighAccuracy: false, // 배터리 소모를 줄이고 응답 시간을 개선
      timeout: 5000, // 5초로 감소
      maximumAge: 600000, // 10분 이내의 캐시된 위치 허용
    };

    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  });
};

export const getWeatherStatus = async (lat, lng) => {
  // 로컬 스토리지에서 캐시된 날씨 확인
  const cachedWeather = JSON.parse(localStorage.getItem(WEATHER_CACHE_KEY));
  if (cachedWeather && Date.now() - cachedWeather.timestamp < CACHE_DURATION) {
    return cachedWeather.data;
  }

  try {
    const appkey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${appkey}&lang=kr&units=metric`
    );
    if (response.status === 200) {
      const weatherData = {
        data: response.data,
        timestamp: Date.now(),
      };
      localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(weatherData));
      return response.data;
    }
  } catch (e) {
    console.error("날씨 정보 에러: ", e);
    throw e;
  }
};
