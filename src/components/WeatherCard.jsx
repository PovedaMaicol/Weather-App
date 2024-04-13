import React, { useRef, useState } from 'react';
import './styles/weatherCard.css';

const fecha = new Date();
const opcionesFecha = { weekday: 'long', month: 'long', day: 'numeric' };
const diaActual = fecha.toLocaleDateString('es-ES', opcionesFecha);
  
    // return (
    //   <div>
    //     <h1>Día actual:</h1>
    //     <p>{diaActual}</p>
    //   </div>
    // );
 
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
<br/>
<p>look for a city</p>
<br/>
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
            <br/>
        <div className='datos'>
        <h2 className='weather_city'><i className="fa-solid fa-location-dot"></i>      {weather?.name}, {weather?.sys.country}</h2>
       
        <h2 className='weather-sub'>{diaActual}</h2>
        </div>

        <article className='weather_container1'>
            <figure>
                <img 
                className='weather_img'
                src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt='weather-icon' 
                />
            </figure>
                <div className='weather_container2'>
                <h3 className='weather_temp'>{
                isCelsius ? 
                temp?.celsius+ ' °' 
                :
                temp?.fahrenheit+ ' °'

                }
                </h3>
                <br/>
                <button className='weather_btn' onClick={handleChange}>Change to {isCelsius ? '°F' : '°C'}</button>
                </div>
           
          
        </article>

        <div>
               <h3 className='weather_clouds'>{weather?.weather[0].description}</h3>

               <ul className='weather_info'>
                <li><span>Wind speed:</span><span> {weather?.wind.speed} <h6>m/s</h6></span></li>
                <li><span>Clouds:</span><span> {weather?.clouds.all}<h6>%</h6></span></li>
                <li><span>Pressure:</span><span> {weather?.main.pressure}<h6>hPa</h6></span></li>
                <li><span>Humidity:</span><span> {weather?.main.humidity}<h6>%</h6></span></li>
               </ul>  
            </div>


            </>

        }

</section>
  )
}

export default WeatherCard;