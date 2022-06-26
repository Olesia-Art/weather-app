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
function showForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <div class="weather-date">${day}</div>
      <img
        src="http://openweathermap.org/img/wn/10d@2x.png"
        alt=""
        width="40"
      />
      <div class="weather-temperature">
        <span class="weather-temperature-max">19°</span>
        <span class="weather-temperature-min">16°</span>
     </div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  let temperature = document.querySelector(".temperature");
  let cityName = document.querySelector("#cityName");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let image = document.querySelector("#image");

  celsiusValue = response.data.main.temp;
  temperature.innerHTML = Math.round(celsiusValue);
  cityName.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  image.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  image.setAttribute("alt", response.data.weather[0].description);
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

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(celsiusValue);
  celsiusTemperature.classList.add("active");
  fahrenheitTemperature.classList.remove("active");
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let fafhernheitValue = (celsiusValue * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fafhernheitValue);
  celsiusTemperature.classList.remove("active");
  fahrenheitTemperature.classList.add("active");
}

let celsiusTemperature = document.querySelector("#celsius");
celsiusTemperature.addEventListener("click", showCelsius);
let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", showFahrenheit);

let celsiusValue = null;

showForecast();
