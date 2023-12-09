import React from 'react'
import './WeatherApp.css'
import sunnyimg from '../images/sunny.png'
import rain from '../images/rainy.png'
import snow from '../images/snow.png'
import cloudy from '../images/cloudy.png'
import thunderrain from '../images/thunderrain.png'
import partyclody from '../images/party cloudy.png'
function WeatherApp() {
  return (
    <div className='weather-container'>
      <div className="weather-box">
        <div className="weather-box-header">
          <input type="text" className='weather-location-search' placeholder='location' />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="weather-box-content-img">
          <img src={sunnyimg} alt="" />
          <h1>00 &deg;C</h1>
        </div>
        <div className="weather-box-content">
          <div className="left-content">
         
            <h5>Wind Speed</h5>
            <h6>00 km/h</h6>
            <h5>visibility</h5>
            <h6>00 km/h</h6>
          </div>
          <div className="right-content">
            <h5>Air Quality</h5>
            <h6>00 ---</h6>
            <h5>uv index</h5>
            <h6>00 ---</h6>
          </div>


        </div>
      </div>
    </div>
  )
}

export default WeatherApp
