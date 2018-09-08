(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

// returns location of user and runs getWeather upon success
function getLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather, locationError, {timeout: 10000});
  } else {
    document.getElementById("demo").innerHTML = "Geolocation is not supported on this browser.";
  }
}

// error handling
function locationError() {
  document.getElementById("title").innerHTML = "the geolocation is not working at the moment."
}

// processes weather data and updates site
// TODO: refactor into separate functions
function getWeather(position) {
  var request = new XMLHttpRequest();

  // retrieving data from open api
  let lat = Math.round(position.coords.latitude * 100) / 100;
  let lon = Math.round(position.coords.longitude * 100) / 100;

  request.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=cf6da6d6f0df9e748deb7ac9a6b0b174`, true);
  request.send();

  request.onreadystatechange = processRequest;

  function processRequest(e){
    if (request.readyState === 4 && request.status === 200) {
      var response = JSON.parse(request.responseText);

      // displays weather icon
      var iconImage = document.getElementById("image");
      var icon = response.weather[0].id;

      // TODO: design gradients for each of the weather conditions
      switch (true) {

        case (icon < 300): // thunderstorm
          iconImage.setAttribute("src", "images/005-storm.png");
          document.body.style.backgroundColor = 'rgb(30,117,131)';
          document.body.style.backgroundImage = 'linear-gradient(135deg, rgba(30,117,131,1) 0%, rgba(47,73,78,1) 68%, rgba(10,15,15,1) 100%)';
          break;

        case (icon < 400): // drizzle
          iconImage.setAttribute("src", "images/014-drop.png");
          document.body.style.backgroundImage = 'linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)';
          break;

        case (icon < 600): // rain
          iconImage.setAttribute("src", "images/007-rain.png");
          document.body.style.backgroundImage = 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)';
          break;

        case (icon < 700): // snow
          iconImage.setAttribute("src", "images/002-temperature-1.png");
          document.body.style.backgroundImage = 'linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)';
          break;

        case (icon < 800): // atmosphere
          iconImage.setAttribute("src", "images/009-wind-1.png");
          document.body.style.backgroundImage = 'linear-gradient(90deg, #efd5ff 0%, #515ada 100%)';
          break;

        case (icon === 800): // clear
          iconImage.setAttribute("src", "images/016-sun.png");
          document.body.style.backgroundColor = "rgb(0,215,255)";
          document.body.style.backgroundImage = "linear-gradient(135deg, rgba(0,215,255,1) 0%, rgba(204,247,255,1) 50%, rgba(255,255,255,1) 100%)";
          break;

        case (icon > 800): // cloud
          iconImage.setAttribute("src", "images/015-cloud.png");
          document.body.style.backgroundImage = 'linear-gradient(90deg, #3F2B96 0%, #A8C0FF 100%)';
          break;

        default:
          alert("none");
          break;
      }

      // dynamically changes HTML to reflect weather data
      document.getElementById("title").innerHTML = `Weather - ${response.name}`
      document.getElementById("status").innerHTML = `${response.weather[0].main}`;
      document.getElementById("temperature").innerHTML = `${Math.round(response.main.temp)}°F`;
      document.getElementById("humidity").innerHTML = `Humidity: ${response.main.humidity}%`
      document.getElementById("wind").innerHTML = `Wind: ${response.wind.speed}mph`
    }
  }
}

getLocation();

},{}]},{},[1]);
