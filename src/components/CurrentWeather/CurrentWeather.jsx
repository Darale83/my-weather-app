import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CurrentWeather.css";
import { useState } from "react";

export default function CurrentWeather({ data }) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const dateTime = new Date(data.dt * 1000);
  const toUtc = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000;
  const currentLocalTime = toUtc + 1000 * data.timezone;
  const selectedDate = new Date(currentLocalTime);

  console.log(selectedDate);

  const [time, setTime] = useState(selectedDate);

  console.log(time);

  const date = selectedDate.toLocaleString("en-GB", {
    day: "numeric",
    weekday: "long",
    month: "long",
  });
  const year = selectedDate.toLocaleString("en-GB", {
    year: "numeric",
  });

  const hour = selectedDate.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",

    hour12: false,
  });

  return (
    <div className="weather" data-aos="zoom-in" offset="4000">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <span className="date-time">{`${date} ${year}`}</span>
          <span className="date-time">{`${"Local Time: "} ${hour}`}</span>
        </div>
      </div>
      <div className="status">
        <div className="main-temp">
          <h3 className="weather-description">
            {data.weather[0].description.replace(
              /^./,
              data.weather[0].description[0].toUpperCase()
            )}
          </h3>
          <img
            className="weather-icon"
            src={`icons/${data.weather[0].icon}.png`}
            alt="weather"
          />

          <div className="nowTemp">
            <h3 className="temperature">{Math.round(data.main.temp)}°C</h3>
            <span className="parameter-label">Feels Like</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
        </div>
        <div className="details">
          <div className="detail-each">
            <h6>Min:</h6>
            <h6>{Math.round(data.main.temp_min)}°C</h6>
          </div>
          <div className="detail-each">
            <h6>Máx:</h6>
            <h6>{Math.round(data.main.temp_max)}°C</h6>
          </div>
          <div className="detail-each">
            <h6>Wind:</h6>
            <h6>{data.wind.speed} m/s</h6>
          </div>
          <div className="detail-each">
            <h6>Humidity:</h6>
            <h6>{data.main.humidity} %</h6>
          </div>
          <div className="detail-each">
            <h6>Pressure:</h6>
            <h6>{data.main.pressure} hPa</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
