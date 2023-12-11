import React, { useEffect, useState } from 'react'
import './WeatherApp.css'
import morningbg from '../images/bg.jpg'
import nightbg from '../images/bg3.jpg'
import sunnyimg from '../images/sunny.png'
import rainy from '../images/rainy.png'
import snow from '../images/snow.png'
import partyclody from '../images/cloudy.png'
import scattercloud from '../images/scartedclouds.png'
import brokencloud from '../images/broken.png'
import mist from '../images/mist.png'
import thunderstrom from '../images/thunderstrom.png'
import rain from '../images/rain.png'




function WeatherApp() {
  useEffect(() => {
    console.log("call the search function");
    search();
    setState("")
  }, [])
  const [state, setState] = useState(['kerala'])
  const [error, setError] = useState(null);
  const [wicon, setWicon] = useState(sunnyimg);
  const [bg_image, setBgImage] = useState(morningbg);
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
      const mint = document.getElementsByClassName("mint");
      const maxt = document.getElementsByClassName("maxt");
      const sunrise = document.getElementsByClassName("sunrise");
      const sunset = document.getElementsByClassName("sunset");



      temperature[0].innerHTML = Math.floor(data.main.temp) + " \u00b0c";
      location[0].innerHTML = data.name;
      windspeed[0].innerHTML = data.wind.speed + " km/h";
      visibility[0].innerHTML = data.visibility / 1000 + " km";
      Pressure[0].innerHTML = data.main.pressure + " hPa";
      Humidity[0].innerHTML = data.main.humidity + " %";
      mint[0].innerHTML = Math.floor(data.main.temp_min) + " \u00b0c";
      maxt[0].innerHTML = Math.floor(data.main.temp_max) + " \u00b0c";
      sunrise[0].innerHTML = sunriseTime;
      sunset[0].innerHTML = sunsetTime;

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(sunnyimg)
      } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setWicon(partyclody)
      } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
        setWicon(scattercloud)
      } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
        setWicon(brokencloud)
      } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
        setWicon(rainy)
      } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
        setWicon(rain)
      } else if (data.weather[0].icon === "11d" || data.weather[0].icon === "11n") {
        setWicon(thunderstrom)
      } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
        setWicon(snow)
      } else if (data.weather[0].icon === "50d" || data.weather[0].icon === "50n") {
        setWicon(mist)
      } else {
        setWicon(sunnyimg)
      }
      // const currTime = new Date().toLocaleTimeString();
      const date = new Date();
      setBgImage(date.getHours() <= 17 ? morningbg : nightbg);

       

      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching weather data. Please try again.");
      alert("Please Check Your Input")
    }
  }

  return (

    <div className='weather-container' style={{ backgroundImage: `url(${bg_image})` }} >
      <div className="weather-box">
        <div className="weather-box-header">
          <input type="text" id='locationSearch' className='weather-location-search' placeholder='Seacrh' value={state} onChange={(e) => { setState(e.target.value) }} />


          <i class="fa-solid fa-magnifying-glass" onClick={() => { search(); setState("") }}></i>
        </div>
        <div className="weather-box-content-img">
          {/* <h3 className='sunrise'>sunrise<br />----<br />am/pm</h3> */}
          <img src={wicon} alt="" className='weather-img' />
          {/* <h3 className='sunset'>sunset <br />----<br />am/pm</h3> */}
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
          <div className="middle-content">
            <h5>Pressure</h5>
            <h6 className='Pressure'>00 hPa</h6>
            <h5>Humidity</h5>
            <h6 className='Humidity'>00 %</h6>
          </div>
          <div className="right-content">
            <h5>Min Temp</h5>
            <h6 className='mint'>00 &deg;</h6>
            <h5>Max Temp</h5>
            <h6 className='maxt'>00 &deg;</h6>
          </div>
          <div className="right-content">
            <h5 title='Sunrise time in your localtime' >sunrise</h5>
            <h6 className='sunrise' title='Sunrise time in your localtime' >00:00</h6>
            <h5 title='Sunset time in your localtime'>sunset</h5>
            <h6 className='sunset' title='Sunset time in your localtime'>00:00</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
