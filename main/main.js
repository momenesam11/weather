'use strict';

var baseurl = "https://api.weatherapi.com/v1";
var apiKey = "9d28f357f2d84cc3955155335251511"; 
var value = document.getElementById("inputField");
var button = document.getElementById("btn");
var dataContainer = document.querySelector(".data");

async function getWeather(city) {
  var url = `${baseurl}/forecast.json?q=${city}&days=3&key=${apiKey}`;
  try {
    var response = await fetch(url);
    if(response.ok) {
      var data = await response.json();
      return data;
    } else {
      console.log('Error fetching data');
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

function displayWeather(data) {
  if (!data) return;

  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  var d0 = new Date(data.forecast.forecastday[0].date);
  var dayName0 = days[d0.getDay()];
  var dayNumber0 = d0.getDate();
  var monthName0 = months[d0.getMonth()];

  var d1 = new Date(data.forecast.forecastday[1].date);
  var dayName1 = days[d1.getDay()];

  var d2 = new Date(data.forecast.forecastday[2].date);
  var dayName2 = days[d2.getDay()];

  // Force re-animation by removing and re-adding elements instead of just innerHTML replacement
  var ele = `<div class="container w-100 w-md-75 topp fade-in">
      <div class="row g-0 g-md-3 mx-2 mx-md-0">
        
        <!-- Today -->
        <div class="card col-md-4 p-0 border border-0 mb-3 mb-md-0">
          <div class="card-header rounded-0 header1 rounded-0">
            <div class="d-flex justify-content-between align-items-center text-white-50">
              <p class="m-0">${dayName0}</p>
              <p class="m-0">${dayNumber0} ${monthName0}</p>
            </div>
          </div>
          <div class="card-body body1">
            <h5 class="card-title text-light fs-5 mt-3">${data.location.name}</h5>
            <h1 class="deg">${data.current.temp_c}<sup>o</sup>C</h1>
            <img src="https:${data.current.condition.icon}" alt="condition" class="w-25"/>
            <h6 class="text-info">${data.current.condition.text}</h6>
            <ul class="d-flex justify-content-start p-0 mt-4 gap-4 flex-wrap">
              <li class="d-flex align-items-center m-0 gap-1"><img src="img/icon-umberella.png">  <p class="m-0 text-white-50">${data.current.humidity}%</p></li>
              <li class="d-flex align-items-center m-0 gap-1"><img src="img/icon-wind.png">  <p class="m-0 text-white-50">${data.current.wind_kph} km/h</p></li>
              <li class="d-flex align-items-center m-0 gap-1"><img src="img/icon-compass.png">  <p class="m-0 text-white-50">${data.current.wind_dir}</p></li>
            </ul>
          </div>
        </div>

        <!-- Tomorrow -->
        <div class="card col-md-4 p-0 border border-0 mb-3 mb-md-0">
          <div class="card-header rounded-0 text-center header2 text-white-50">${dayName1}</div>
          <div class="card-body d-flex flex-column align-items-center justify-content-center body2">
            <img src="https:${data.forecast.forecastday[1].day.condition.icon}" alt="condition" />
            <h3 class="text-light mt-3">${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h3>
            <h6 class="text-white-50">${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></h6>
            <h6 class="text-info mt-3">${data.forecast.forecastday[1].day.condition.text}</h6>
          </div>
        </div>

        <!-- Day After Tomorrow -->
        <div class="card col-md-4 p-0 border border-0 mb-3 mb-md-0">
          <div class="card-header rounded-0 text-center header3 text-white-50">${dayName2}</div>
          <div class="card-body d-flex flex-column align-items-center justify-content-center body3">
            <img src="https:${data.forecast.forecastday[2].day.condition.icon}" alt="condition" />
            <h3 class="text-light mt-3">${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h3>
            <h6 class="text-white-50">${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></h6>
            <h6 class="text-info mt-3">${data.forecast.forecastday[2].day.condition.text}</h6>
          </div>
        </div>

      </div>
    </div>`;

  // We completely reset the innerHTML to trigger the CSS animation from scratch
  dataContainer.innerHTML = "";
  setTimeout(() => {
    dataContainer.innerHTML = ele;
  }, 10);
}

button.addEventListener("click", async function() {
  if(value.value.length >= 3) {
    var weatherData = await getWeather(value.value);
    displayWeather(weatherData);
  }
});

value.addEventListener("input", async function() {
  if (value.value.length >= 3) {
    var weatherData = await getWeather(value.value);
    displayWeather(weatherData);
  } else if (value.value.length === 0) {
    var weatherData = await getWeather("Cairo");
    displayWeather(weatherData);
  }
});

(async function() {
  var weatherData = await getWeather("Cairo");
  displayWeather(weatherData);
})();