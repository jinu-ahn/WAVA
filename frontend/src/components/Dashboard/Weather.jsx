import React, { useEffect, useState } from "react";
import { getLocation, getWeatherStatus } from "./WeatherService";

function Weather() {
  // const { location, error } = GetLoc();
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (!location) {
  //     return;
  //   }

  //   const getWeather = async () => {
  //     const resp = await getWeatherStatus(
  //       location?.latitude,
  //       location?.longitude
  //     );
  //     setCity(resp?.name);
  //     setWeather(resp?.weather[0]?.icon);
  //     setTemp(`${resp?.main?.temp}°C`);
  //     setLoading(false);
  //   };

  //   getWeather();
  // }, [location, error]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // 먼저 캐시된 날씨 데이터 확인
        const cachedWeather = JSON.parse(
          localStorage.getItem("cached_weather")
        );
        if (
          cachedWeather &&
          Date.now() - cachedWeather.timestamp < 10 * 60 * 1000
        ) {
          setWeatherData(cachedWeather.data);
          setLoading(false);
        }

        // 위치 정보 가져오기
        const location = await getLocation();

        // 새로운 날씨 데이터 가져오기
        const weather = await getWeatherStatus(
          location.latitude,
          location.longitude
        );
        setWeatherData(weather);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 10 * 60 * 1000); // 10분마다 갱신

    return () => clearInterval(intervalId);
  }, []);

  if (loading && !weatherData) return <div>날씨 정보를 불러오는 중...</div>;
  if (error)
    return (
      <div>
        날씨 정보를 가져오는데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
      </div>
    );
  if (!weatherData) return null;

  return (
    <div className="bg-[#ffe9ae] p-2 rounded-lg shadow-md">
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].description}
        className="mx-auto"
      />
      <p className="text-2xl font-bold text-center text-[#18336c]">
        {weatherData.main.temp.toFixed(1)}°C
      </p>
      <p className="text-center text-[#18336c]">{weatherData.name}</p>
      <p className="text-sm text-center text-[#18336c]">
        {weatherData.weather[0].description}
      </p>
    </div>
  );
}

export default Weather;
