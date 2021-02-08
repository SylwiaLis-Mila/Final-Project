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

// to forecast hours
 function formatHours(timestrap) {
   let date=new Date(timestrap);
    let hours=date.getHours();
    let minutes=date.getMinutes();
    if(hours < 10){
      hours=`0${hours}`;
    }
     if(minutes < 10){
      minutes=`0${minutes}`;
    }
   return `${hours}:${minutes}`;
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

   celsiusTemperature = response.data.main.temp;

   temperatureElement.innerHTML=Math.round(celsiusTemperature); 
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
  
}
//forecast
function displayForecast(response){
  let forecastElement=document.querySelector("#forecast");
  forecastElement.innerHTML=null;
 let forecast=null;
 
      for (let index=0; index< 6; index++){
      forecast=response.data.list[index];

      forecastElement.innerHTML+=`<div class="col-2">
                                <h5 id=time-forecast>
                                  ${formatHours(forecast.dt*1000)}
                                </h5>
                                <div class="img-forest">
                                    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="">
                                </div>
                                
                                <div class="temperature-forest">
                                <strong><span class="forecast-max">${Math.round(forecast.main.temp_max)}° </strong> 
                                <span class="forecast-max">${Math.round(forecast.main.temp_min)}°
                                </div>
                            </div>`;
      } 
  }


// show searched location
function search(city) {
let apiKey = "f58a3da8d9e0f160ba2b997349a49f23";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

     // for forecast
apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
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
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);


  let forecastMax = document.querySelectorAll(".forecast-max");
  forecastMax.forEach(function (item) {
  let currentTemperature = item.innerHTML;
  item.innerHTML = Math.round(((currentTemperature - 32) * 5) / 9);
  });

  let forecastMin = document.querySelectorAll(".forecast-min");
  forecastMin.forEach(function (item) {
  let currentTemperature = item.innerHTML;
  item.innerHTML = Math.round(((currentTemperature - 32) * 5) / 9);
  celsius.removeEventListener("click", celsiusConversion);
  fahrenheit.addEventListener("click", fahrenheitConversion);
  });
}

//to fahrenheit
function fahrenheitConversion(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let forecastMax = document.querySelectorAll(".forecast-max");
  forecastMax.forEach(function (item) {
  let currentTemperature = item.innerHTML;
  item.innerHTML = Math.round((currentTemperature * 9) / 5 + 32);
  });

  let forecastMin = document.querySelectorAll(".forecast-min");
  forecastMin.forEach(function (item) {
  let currentTemperature = item.innerHTML;
  item.innerHTML = Math.round((currentTemperature * 9) / 5 + 32);

  celsius.addEventListener("click", celsiusConversion);
  fahrenheit.removeEventListener("click", fahrenheitConversion);
  });
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getCurrentLocation);

let form=document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let celsiusTemperature = null;

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusConversion);
 
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitConversion);



search("Stuttgart");