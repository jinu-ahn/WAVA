import { useEffect, useState } from "react";

function GetLoc() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(true);
      return;
    }

    const options = {
      maximumAge: 0,
      timeout: 5000,

      enableHighAccuracy: true,
    };

    navigator.geolocation.getCurrentPosition(
      handleGetLoc,
      (e) => setError(true),
      options
    );
  }, []);

  const handleGetLoc = (location) => {
    const { latitude, longitude } = location.coords;
    setLocation({ latitude, longitude });
  };

  return { location, error };
}

export default GetLoc;
