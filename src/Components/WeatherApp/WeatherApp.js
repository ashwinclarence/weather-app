import React, { useState } from 'react'
import './WeatherApp.css'
import morningbg from '../images/bg.jpg'
import nightbg from '../images/bg3.jpg'
import sunnyimg from '../images/sunny.png'
import rain from '../images/rainy.png'
import snow from '../images/snow.png'
import cloudy from '../images/cloudy.png'
import thunderrain from '../images/thunderrain.png'
import partyclody from '../images/party cloudy.png'



function WeatherApp() {
  const [state, setState] = useState([])
  const [error, setError] = useState(null);
  let API_KEY = "aa1710925314018ee0b5ee1619eda058";
  const search = async () => {
    try {
      const element = document.getElementsByClassName("weather-location-search");
      if (element[0].value === "") {
        return 0;
      }
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${API_KEY}`;
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      let data = await response.json();


      const sunriseTimestamp = data.sys.sunrise;
      const sunsetTimestamp = data.sys.sunset;
      const sunriseDate = new Date(sunriseTimestamp * 1000);
      const sunsetDate = new Date(sunsetTimestamp * 1000);
      const sunriseTime = sunriseDate.toLocaleTimeString();
      const sunsetTime = sunsetDate.toLocaleTimeString();


      const temperature = document.getElementsByClassName("temperature-measure");
      const location = document.getElementsByClassName("location");
      const windspeed = document.getElementsByClassName("wind-speed");
      const visibility = document.getElementsByClassName("visibility");
      const Pressure = document.getElementsByClassName("Pressure");
      const Humidity = document.getElementsByClassName("Humidity");
      const sunrise = document.getElementsByClassName("sunrise");
      const sunset = document.getElementsByClassName("sunset");



      temperature[0].innerHTML = data.main.temp + " \u00b0c";
      location[0].innerHTML = data.name;
      windspeed[0].innerHTML = data.wind.speed + " km/h";
      visibility[0].innerHTML = data.visibility / 1000 + " km";
      Pressure[0].innerHTML = data.main.pressure + " hPa";
      Humidity[0].innerHTML = data.main.humidity + " %";
      sunrise[0].innerHTML = "sunrise<br/>" + sunriseTime;
      sunset[0].innerHTML = "sunset<br/>" + sunsetTime;

      setError(null);
  } catch (error) {
    console.error("Error:", error);
    setError("An error occurred while fetching weather data. Please try again.");
    alert("Please Check Your Input")
  }
  }
  return (
    <div className='weather-container' >
      <div className="weather-box">
        <div className="weather-box-header">
          <input type="text" className='weather-location-search' placeholder='Seacrh' value={state} onChange={(e) => setState(e.target.value)} />
          <i class="fa-solid fa-magnifying-glass" onClick={() => { search(); setState("") }}></i>
        </div>
        <div className="weather-box-content-img">
          <h3 className='sunrise'>sunrise<br />----<br />am/pm</h3>
          <img src={sunnyimg} alt="" className='weather-img' />
          <h3 className='sunset'>sunset <br />----<br />am/pm</h3>
        </div>
        <div className="weather-box-content-temp">
          <h1 className='temperature-measure'>00 &deg;C</h1>
          <h1 className='location'>Location</h1>
        </div>
        <div className="weather-box-content">
          <div className="left-content">

            <h5>Wind Speed</h5>
            <h6 className='wind-speed'>00 km/h</h6>
            <h5>visibility</h5>
            <h6 className='visibility'>00 km</h6>
          </div>
          <div className="right-content">
            <h5>Pressure</h5>
            <h6 className='Pressure'>00 hPa</h6>
            <h5>Humidity</h5>
            <h6 className='Humidity'>00 %</h6>
          </div>


        </div>
      </div>
    </div>
  )
}

export default WeatherApp
