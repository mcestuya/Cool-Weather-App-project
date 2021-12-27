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

let dateElement = document.querySelector("#currentDate");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayCurrentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#currentTemp").innerHTML =
    Math.round(response.data.main.temp) + "°C";

  document.querySelector("#highest").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  // document.querySelector("#sunrise").innerHTML = response.data.sys.sunrise;
  //document.querySelector("#sunset").innerHTML = response.data.sys.sunset;

  let sunriseTimeStamp = (document.querySelector("#sunrise").innerHTML =
    response.data.sys.sunrise);
  var date = new Date(sunriseTimeStamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var formattedTimeSun = hours + ":" + minutes.substr(-2);
  document.querySelector("#sunrise").innerHTML = formattedTimeSun;
  console.log(formattedTimeSun);

  let sunsetTimeStamp = (document.querySelector("#sunset").innerHTML =
    response.data.sys.sunset);
  var date = new Date(sunsetTimeStamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var formattedTimeSet = hours + ":" + minutes.substr(-2);
  document.querySelector("#sunset").innerHTML = formattedTimeSet;
  console.log(formattedTimeSet);

  //celsiusTemp.innerHTML = fahrenheit;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let celsiusTemp = (document.querySelector("#currentTemp").innerHTML =
    Math.round(event.data.main.temp) + "°C");
  let fahrenheit = (celsiusTemp + 32) * 1.8;
  celsiusTemp.innerHTML = fahrenheit;

  console.log(fahrenheit);
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

let fahrenheightLink = document.querySelector("#fahrenheit-link");
fahrenheightLink.addEventListener("click", displayCurrentWeather);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

onLoad("London");
