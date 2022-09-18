import { useState } from "react";
import {
  WEATHER_API_URL,
  WEATHER_API_KEY,
  GEO_API_URL,
  geoApiOptions,
} from "./Api";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Forecast from "./components/Forecast/Forecast";
import Search from "./components/Search/Search";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [time, setTime] = useState(null);
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");
    const wikiId = searchData.wikiId;
    console.log(wikiId);

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const timeFetch = fetch(
      `${GEO_API_URL}/cities/${wikiId}/time`,
      geoApiOptions
    );

    Promise.all([currentWeatherFetch, forecastFetch, timeFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();
        const timeResponse = await response[2].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
        setTime({ city: searchData.label, ...timeResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);
  console.log(time);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
