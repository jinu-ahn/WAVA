import { useEffect, useState } from "react";
import GetLoc from "./GetLoc";
import { getWeatherStatus } from "../../api/todoApi";

function Weather() {
  const { location, error } = GetLoc();
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");

  useEffect(() => {
    if (!location) {
      return;
    }

    const getWeather = async () => {
      const resp = await getWeatherStatus(
        location?.latitude,
        location?.longitude
      );
      setCity(resp?.name);
      setWeather(resp?.weather[0]?.icon);
      setTemp(`${resp?.main?.temp}°C`);
      setLoading(false);
    };

    getWeather();
  }, [location, error]);
  return (
    <div className="bg-white">
      <img src={`http://openweathermap.org/img/wn/${weather}.png`}></img>
      <span>{temp}</span>
      <p>{city}</p>
    </div>
  );
}

export default Weather;
