const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const weatherBody = document.querySelector(".weather-body");
const locationNotFound = document.querySelector(".location-not-found");

const checkWeather = async (city) => {
  const key = "71f7932972e31c8fd957afa74e1b0605";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  const weather_data = await fetch(url).then((res) => res.json());

  if (weather_data.cod === `404`) {
    locationNotFound.style.display = "flex";
    weatherBody.style.display = "none";
    return;
  }

  locationNotFound.style.display = "none";
  weatherBody.style.display = "flex";
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  windSpeed.innerHTML = `${weather_data.wind.speed}Km/H`;

  switch (weather_data.weather[0].main) {
    case "Cloud":
      weatherImg.src = "img/cloud.png";
      break;
    case "Clear":
      weatherImg.src = "img/clear.png";
      break;
    case "Rain":
      weatherImg.src = "img/rain.png";
      break;
    case "Snow":
      weatherImg.src = "img/snow.png";
      break;
    case "Mist":
      weatherImg.src = "img/mist.png";
      break;
    default:
      break;
  }
};

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
