const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body')

async function checkWeather(city){
    const api_key = "38649200e185350d0a148b346600f297";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    location_not_found.style.display = "none"
    weather_body.style.display = "flex";

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML =`${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/h`;

    switch(weather_data.weather[0].main){
        case 'clouds':
            weather_img.src = "/images-png/cloud.png";
            break;
        case 'clear':
            weather_img.src = "/images-png/clear.png";
            break;
        case 'Rain':
            weather_img.src = "/images-png/rain.png";
             break;
        case 'Mist':
            weather_img.src = "/images-png/mist.png";
            break; 
        case 'Haze':
            weather_img.src = "/images-png/snow.png";
            break;   
    }

    console.log(weather_data);
}   

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});