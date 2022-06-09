let now = new Date();
let currentDate = document.querySelector("#date");

let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

currentDate.innerHTML = `${day} ${hours}:${minutes}`;

//

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector(".temperature");
  temp.innerHTML = `${temperature}`;
  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = `${response.data.name}`;
}

function currentPosition(position) {
  let apiKey = "cfe05abaf5b67a4bfcbf2eff8aa44335";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrentPosition);

//
function showSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let apiKey = "cfe05abaf5b67a4bfcbf2eff8aa44335";
  let city = searchInput.value;
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(cityUrl).then(showWeather);
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", showSearch);

//
//function showCelsius(event) {
//event.preventDefault();
//let temperatureValue = document.querySelector(".temperature");
//temperatureValue.innerHTML = 19;
//}

//function showFahrenheit(event) {
// event.preventDefault();
//let temperatureValue = document.querySelector(".temperature");
// temperatureValue.innerHTML = 45;
//}

//let celsiusTemperature = document.querySelector("#celsius");
//celsiusTemperature.addEventListener("click", showCelsius);
//let fahrenheitTemperature = document.querySelector("#fahrenheit");
//fahrenheitTemperature.addEventListener("click", showFahrenheit);
