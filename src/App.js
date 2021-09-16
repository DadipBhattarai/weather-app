import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCelsius, setIsCelcius] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const apiKey = "bb0723185d6fd5480082fe51a35d76c1";

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      )
        .then((blob) => blob.json())
        .then((res) => {
          setWeather(res);
          setIsLoading(false);
        });
    });
  }, []);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  const tempInKelvin = weather?.main?.temp;
  const celsius = Math.ceil(tempInKelvin - 273.15);
  const weatherType = weather?.weather?.[0].main;
  const weatherIconCode = weather?.weather?.[0].icon;
  const weatherIconUrl = `https://openweathermap.org/img/w/${weatherIconCode}.png`;
  const windSpeed = weather?.wind?.speed;
  const cityName = weather?.name;
  const countryName = weather?.sys?.country;
  const fahrenheit = Math.ceil(celsius * (9 / 5) + 32);

  const handleTempClick = () => {
    setIsCelcius(!isCelsius);
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="weather-part">
        <h3 onClick={handleTempClick}>
          {isCelsius ? <>{celsius}&deg; C</> : <>{fahrenheit}&deg; F</>}
        </h3>
        <div className="weather-more-info">
          {weatherType} <img src={weatherIconUrl} alt="Weather Icon" />
          {windSpeed}m/s
        </div>
        <h3>
          {cityName}, {countryName}
        </h3>
      </div>
    </div>
  );
}

export default App;
