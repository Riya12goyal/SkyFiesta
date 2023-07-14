const inputbox = document.querySelector('#input-box');
const search_btn = document.getElementById('search-btn');
const max_temp = document.querySelector('.max_temp');
const humid = document.getElementById('humid');
const desc = document.querySelector('.desc');
const weather_img = document.querySelector('.weather-img');
const wind_speed = document.getElementById('wind');
const not_found = document.querySelector('.not_found');
const weather_body = document.querySelector('.weather-body');
const loc = document.getElementById('location-btn');
const forecast = document.getElementById('5days');
const temp = document.querySelector('.temp');

let myaudio = new Audio();
let previousaudio = null;
async function checkWeather(city,lon,type){
	const api_key= "7a21c66e6a225c103f421d1fe84dca41";
	let url;
	if(type === 'c'){
	 url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;}
	if(type === 'lat'){
     url = `https://api.openweathermap.org/data/2.5/weather?lat=${city}&lon=${lon}&appid=${api_key}`;
	}

	const weatherd = await fetch(`${url}`).then(response => response.json());          //response.json() : converts json data to string

 if(weatherd.cod === `404`){
	not_found.style.display = "flex";
	weather_body.style.display = "none";
	
	return;
 }
weather_body.style.display = "flex";
not_found.style.display = "none";
temp.innerHTML = `${Math.round(weatherd.main.temp - 273.15)}`;
desc.innerHTML = `${weatherd.weather[0].description}`;
humid.innerHTML = `${weatherd.main.humidity}`;
wind_speed.innerHTML = `${weatherd.wind.speed}`;


switch(weatherd.weather[0].main){
	
	case 'Clouds' : weather_img.src = "./images/cloud.gif";
	 myaudio.src =  "./audios/wet-weather-108490.mp3";
	break;
	
	case 'Clear': weather_img.src = "./images/clear.gif";
		myaudio.src =  "./audios/clear day.mp3"
  
	break;
	
	case 'Rain': weather_img.src = "./images/rain.gif";
		myaudio.src =  "./audios/light-rain-ambient-114354.mp3"
	 
	break;
	
	case 'Snow' : weather_img.src = "./images/snowy.gif";
    myaudio.src =  "./audios/Snowy_Day.mp3"
	break;
	 
	case 'Mist': weather_img.src = "./images/mist.png";
	myaudio.src= "./audios/Snowy_Day.mp3"
	
	break;
	
	case 'Thunderstorm': weather_img.src= "./images/thunder.gif";
	myaudio.src = "./audios/epic-storm-thunder-rainwindwaves-no-loops-106800.mp3"
	
	break;
	
	case 'Drizzle': weather_img.src = "./images/rainy.gif";
	
		myaudio.src = "./audios/light-rain-ambient-114354.mp3"

	break;
	
	case 'Smoke': weather_img.src = "./images/smoke.gif";
	break;
	
	case 'Haze': weather_img.src = "./images/haze.png";
	myaudio.src =  "./audios/wind-outside-sound-ambient-141989.mp3"
	
	break;
	
	case 'Dust': weather_img.src = "./images/sand.gif";
	break;
	
	case 'Fog': weather_img.src = "./images/smoke.gif";
	break;
	
	case 'Sand': weather_img.src = "./images/sand.gif";
	break;
	
	case 'Ash': weather_img.src = "./images/sand.gif";
	break;
	
	case 'Squall': weather_img.src = "./images/squall.png";
	break;
	
	case 'Tornado': weather_img.src = "./images/tornado.gif";
	myaudio.src = "./audios/hurricane-storm-nature-sounds-8397.mp3"
	break;
	default:
return;
}

if(previousaudio){
	previousaudio.pause();
        previousaudio.currentTime = 0;
}
myaudio.play();
previousaudio = myaudio;
}

function getlat(){
	let lat = 0;
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition((pos)=>{
		 lat = pos.coords.latitude;
		});
	}
	return lat;
}
function getlong(){
	let lon = 0;
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition((pos)=>{
			 lon = pos.coords.longitude;
		});
	}
	return lon;
}
search_btn.addEventListener('click', ()=>{
	checkWeather(inputbox.value,0,'c');
})

loc.addEventListener('click', ()=>{
	
	let res_location = confirm('allow the website to access your location?');
	
	if(res_location){
		var lon = getlong();
		var lat = getlat();
		checkWeather(lat,lon,'lat');
	}
	
})

