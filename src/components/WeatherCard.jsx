import React, { useRef, useState } from 'react';
import './styles/weatherCard.css';

const WeatherCard = ({weather, temp, setTextInput, hasError}) => {

    const [isCelsius, setIsCelsius] = useState(true);

    // console.log(weather)
    // console.log(temp)

    const handleChange = () => {
        setIsCelsius(!isCelsius);

    }

    const city =  useRef();

    const handleForm = event => {
        event.preventDefault();
        setTextInput(city.current.value.toLowerCase().trim());
    }

  return (
    <section className='weather'>
        <h1 className='weather_title'>Weather app</h1>

        <form className='weather_form' onSubmit={handleForm}>
            <input type='text' ref={city} />
            <button className='form_btn'>Search</button>
        </form>

        {
            hasError ?
            <>
            <h2>That city was not found</h2>
            <h3>Please, try again</h3>
            </>
            :
            <>
            
        <h2 className='weather_city'>{weather?.name}, {weather?.sys.country}</h2>
        <article className='weather_container1'>
            <figure>
                <img 
                className='weather_img'
                src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt='weather-icon' 
                />
            </figure>
            <div>
               <h3 className='weather_clouds'>{weather?.weather[0].description}</h3>
               <ul className='weather_info'>
                <li><span>Wind speed:</span><span> {weather?.wind.speed} m/s</span></li>
                <li><span>Clouds:</span><span> {weather?.clouds.all} %</span></li>
                <li><span>Pressure:</span><span> {weather?.main.pressure} hPa</span></li>
                <li><span>Humidity:</span><span> {weather?.main.humidity} %</span></li>
               </ul>  
            </div>
        </article>
<div className='weather_container2'>
    <h3 className='weather_temp'>{
         isCelsius ? 
         temp?.celsius+ ' °C' 
         :
         temp?.fahrenheit+ ' °F'

        }
     </h3>

    <button className='weather_btn' onClick={handleChange}>Change to {isCelsius ? '°F' : '°C'}</button>
</div>
            </>

        }

</section>
  )
}

export default WeatherCard;