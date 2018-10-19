
function getLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayWeather, locationError, {timeout: 10000});
  } else {
    document.getElementById("demo").innerHTML = "Geolocation is not supported on this browser.";
  }
}

// error handling
function locationError() {
  document.getElementById("title").innerHTML = "The geolocation is not currently working."
}

function displayWeather(position) {
  let coords = LatLonCoords(position);
  console.log(coords);
  getWeatherData(coords.lat, coords.lon);
  getForecastData(coords.lat, coords.lon);
}

function LatLonCoords(position) {
  let lat = Math.round(position.coords.latitude * 100) / 100;
  let lon = Math.round(position.coords.longitude * 100) / 100;
  let coords = { "lat": lat, "lon": lon };
  return coords;
}

function getWeatherData(lat, lon) {
  var request = new XMLHttpRequest();

  request.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=cf6da6d6f0df9e748deb7ac9a6b0b174`, true);
  request.send();
  request.onreadystatechange = processRequest;

  function processRequest(e){
    if (request.readyState === 4 && request.status === 200) {
      var response = JSON.parse(request.responseText);
      renderMainData(response);
      renderForecastData(0, response);
    }
  }
}

function getForecastData(lat, lon) {
  var request = new XMLHttpRequest();

  request.open('GET', `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&APPID=cf6da6d6f0df9e748deb7ac9a6b0b174`, true);
  request.send();
  request.onreadystatechange = processRequest;

  function processRequest(e){
    if (request.readyState === 4 && request.status === 200) {
      var response = JSON.parse(request.responseText);
      for (let i = 1; i < 5; i++) {
        renderForecastData(i, response);
      }
    }
  }
}

function renderMainData(apiResponse) {
  var iconImage = document.getElementById("weather-icon");
  var icon = apiResponse.weather[0].id;
  // weather icon and background gradient are both dependent on icon value
  // switch below determines the main icon and background gradient
  switch (true) {

    case (icon < 300): // thunderstorm
      iconImage.classList.add('wi-thunderstorm');
      document.body.style.backgroundColor = 'rgb(30,117,131)';
      document.body.style.backgroundImage = 'linear-gradient(135deg, rgba(30,117,131,1) 0%, rgba(47,73,78,1) 68%, rgba(10,15,15,1) 100%)';
      break;

    case (icon < 400): // drizzle
      iconImage.classList.add('wi-sprinkle');
      document.body.style.backgroundImage = 'linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)';
      break;

    case (icon < 600): // rain
      iconImage.classList.add('wi-rain');
      document.body.style.backgroundImage = 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)';
      break;

    case (icon < 700): // snow
      iconImage.classList.add('wi-snow');
      document.body.style.backgroundImage = 'linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)';
      break;

    case (icon < 800): // atmosphere
      iconImage.classList.add('wi-windy');
      document.body.style.backgroundImage = 'linear-gradient(90deg, #efd5ff 0%, #515ada 100%)';
      break;

    case (icon === 800): // clear
      iconImage.classList.add('wi-day-sunny');
      document.body.style.backgroundColor = "rgb(0,215,255)";
      document.body.style.backgroundImage = "linear-gradient(135deg, rgba(0,215,255,1) 0%, rgba(204,247,255,1) 50%, rgba(255,255,255,1) 100%)";
      break;

    case (icon > 800): // cloud
      iconImage.classList.add('wi-cloud');
      document.body.style.backgroundImage = 'linear-gradient(90deg, #3F2B96 0%, #A8C0FF 100%)';
      break;

    default:
      alert("none");
      break;
  }
  // location
  document.getElementById("title").innerHTML = `${apiResponse.name}`;
  // status
  document.getElementById("status").innerHTML = `${apiResponse.weather[0].main}`;
  // temp
  document.getElementById("temperature").innerHTML = `${Math.round(apiResponse.main.temp)}°F`;
  // humidity
  document.getElementById("humidity").innerHTML = `Humidity: ${apiResponse.main.humidity}%`
  // wind
  document.getElementById("wind").innerHTML = `Wind: ${Math.round(apiResponse.wind.speed)}mph`
}

function renderForecastData(day, apiResponse) {
  // setting date
  let forecastDate = new Date();
  forecastDate.setDate(forecastDate.getDate() + day);

  let daySelector = `day-${day}`;

  if (day == 0) {
    forecastWeatherData = apiResponse;
  }
  else {
    forecastWeatherData = apiResponse.list[((day - 1) * 8 + 4)];
  }


  let date = document.querySelector(`.${daySelector} .date`);
  let iconImage = document.querySelector(`.${daySelector} .wi`);
  let icon = forecastWeatherData.weather[0].id;
  let high = document.querySelector(`.${daySelector} .forecast-high`);
  let low = document.querySelector(`.${daySelector} .forecast-low`);
  // date
  date.innerHTML = `${forecastDate.getMonth() + 1}/${forecastDate.getDate()}`;

  status
  switch (true) {

    case (icon < 300): // thunderstorm
      iconImage.classList.add('wi-thunderstorm');
      break;

    case (icon < 400): // drizzle
      iconImage.classList.add('wi-sprinkle');
      break;

    case (icon < 600): // rain
      iconImage.classList.add('wi-rain');
      break;

    case (icon < 700): // snow
      iconImage.classList.add('wi-snow');
      break;

    case (icon < 800): // atmosphere
      iconImage.classList.add('wi-windy');
      break;

    case (icon === 800): // clear
      iconImage.classList.add('wi-day-sunny');
      break;

    case (icon > 800): // cloud
      iconImage.classList.add('wi-cloud');
      break;

    default:
      break;
  }
  // high
  high.innerHTML = `High: ${Math.round(forecastWeatherData.main.temp_max)}`;
  // low
  low.innerHTML = `Low: ${Math.round(forecastWeatherData.main.temp_min)}`;
}

getLocation();
