function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  let todayDate = date.getDate();
  let monthIndex = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[monthIndex];
  return `${day}, ${todayDate} ${month} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5)
      forecastHTML =
        forecastHTML +
        `
         <div class="col-2">
                 <div class="weather-forecast-date">
                            ${formatDay(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="42">
                <div class ="weather-forecast-temperatures"> <span class="weather-forecast-max"> ${Math.round(
                  forecastDay.temp.max
                )}°</span><span class="weather-forecast-min">  ${Math.round(
          forecastDay.temp.min
        )}°</span> </div>
              </div>
               </div>
          `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "ba961258607b8a685407ad6954262a1c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayCurrentWeather(response) {
  getForecast(response.data.coord);

  let dateElement = document.querySelector("#currentDate");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#currentTemp").innerHTML =
    Math.round(response.data.main.temp) + "°C";

  document.querySelector("#highest").innerHTML = Math.round(
    response.data.main.temp_max
  );

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function onLoad(city) {
  let apiKey = "ba961258607b8a685407ad6954262a1c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  onLoad(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

onLoad("London");

var d = new Date();
var h = d.getHours();
if (h < 6)
  document.write(
    '<style type="text/css">body{background: url(src/evening.jpg) no-repeat center center fixed;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;}"></style>'
  );
else if (h < 18)
  document.write(
    '<style type="text/css">body{background: url(src/morning.jpg)  no-repeat center center fixed;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;}"></style>'
  );
