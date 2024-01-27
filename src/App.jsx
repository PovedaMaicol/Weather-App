import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
const APIkey = '2334bfb071c9ea1cf54cb6aad47f423f';

function App() {


const [coords, setCoords] = useState();
const [weather, setWeather] = useState();
const [temp, setTemp] = useState();
const [isLoading, setIsLoading] = useState(true);
const [textInput, setTextInput] = useState('');
const [finder, setFinder] = useState();
const [hasError, setHasError] = useState(false);
  
 const succes = position => {
  console.log(position);
  const obj = {
    lat: position.coords.latitude,
    lon: position.coords.longitude
  }

  setCoords(obj);
 }

 useEffect(() => {
  navigator.geolocation.
  getCurrentPosition(succes);
}, []);

 useEffect(() => {
if (coords) {

  const url =  `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}`;

  axios.get(url)
  .then(res => {
const obj = {
  celsius: (res.data.main.temp - 273.15).toFixed(2),
  fahrenheit: ((res.data.main.temp - 273.15) * (9/5) + 32).toFixed(2),
}
setTemp(obj);
setHasError(false);
setWeather(res.data)
})
.catch(err => {
  setHasError(true);
  console.log(err)
})
  
.finally(() =>{
  setIsLoading(false);
})

}
}, [coords]);

useEffect(() => {
  if(textInput) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${textInput}&appid=${APIkey}`;
axios.get(url)
.then(res => {
  const obj = {
    celsius: (res.data.main.temp - 273.15).toFixed(2),
    fahrenheit: ((res.data.main.temp - 273.15) * (9/5) + 32).toFixed(2),
  }
  setTemp(obj);
  setHasError(false);
  setFinder(res.data)
})
.catch(err => {
  setHasError(true);
  console.log(err);
});

  }
}, [textInput]);


  // console.log(coords);
  // console.log(weather);
  console.log(finder);

  return (
  <div className='app'>
    {
      isLoading ?
     <div className='container_loading'>
      <img className='imLoading'
      src='https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700'></img>
</div>
      :
      textInput ? 

      <WeatherCard 
      weather={finder}
      temp={temp}
      setTextInput={setTextInput}
      hasError={hasError}
  
      />
      :
      <WeatherCard 
      weather={weather}
      temp={temp}
      setTextInput={setTextInput}
      hasError={hasError}
  
      />

    }
    

  </div>
  )
}

export default App;
