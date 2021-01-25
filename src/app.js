function formatDate(timestrap){
  let date=new Date(timestrap);
    let hours=date.getHours();
    let minutes=date.getMinutes();
    if(hours < 10){
      hours=`0${minutes}`;
    }
     if(minutes < 10){
      minutes=`0${minutes}`;
    }
     let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
    let day=days[date.getDay ()];
    return `${day} ${hours}:${minutes}`;
}
// let weather function
function displayTemperature(response) {
//console.log(response.data);   
   let temperatureElement=document.querySelector("#temperature");
   let cityElement=document.querySelector("#city");
   let descriptionElement=document.querySelector("#description");
   let humidityElement=document.querySelector("#humidity");
   let windElement=document.querySelector("#wind");
   let dateElement=document.querySelector("#date");
   let iconElement=document.querySelector("#icon");


   temperatureElement.innerHTML=Math.round(response.data.main.temp); 
   cityElement.innerHTML=response.data.name;
   descriptionElement.innerHTML=response.data.weather[0].description;
   humidityElement.innerHTML=response.data.main.humidity;
   windElement.innerHTML=Math.round(response.data.wind.speed);
   dateElement.innerHTML=formatDate(response.data.dt*1000);
   iconElement.setAttribute(
       "src",
       `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
   );
   iconElement.setAttribute("alt", response.data.weather[0].description); //alt
  celsiusTemperature = response.data.main.temp;
}
// show searched location
function search(city) {
let apiKey = "f58a3da8d9e0f160ba2b997349a49f23";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement=document.querySelector("#city-input");
  search(cityInputElement.value);
}

// let current location
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f58a3da8d9e0f160ba2b997349a49f23";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


//to celsius
function celsiusConversion(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusConversion);

//to fahrenheit
function fahrenheitConversion(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getCurrentLocation);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitConversion);

let celsiusTemperature = null;

let form=document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);




search("New York");