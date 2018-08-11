
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
  document.getElementById("demo").innerHTML = "the geolocation is not working at the moment."
}

// processes weather data and updates site
// TODO: refactor into separate functions
function getWeather(position) {
  var request = new XMLHttpRequest();

  let lat = Math.round(position.coords.latitude * 100) / 100;
  let lon = Math.round(position.coords.longitude * 100) / 100;

  document.getElementById("demo").innerHTML = `Latitude: ${lat}<br> Longitude: ${lon}`;

  request.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=cf6da6d6f0df9e748deb7ac9a6b0b174`, true);
  request.send();

  request.onreadystatechange = processRequest;

  function processRequest(e){
    if (request.readyState === 4 && request.status === 200) {
      var response = JSON.parse(request.responseText);

      // displays weather icon
      var iconImage = document.getElementById("image");
      var icon = response.weather[0].id;

      switch (true) {
        case (icon < 300): // thunderstorm
          iconImage.setAttribute("src", "images/005-storm.png");
          break;
        case (icon < 400): // drizzle
          iconImage.setAttribute("src", "images/014-drop.png");
          break;
        case (icon < 600): // rain
          iconImage.setAttribute("src", "images/007-rain.png");
          break;
        case (icon < 700): // snow
          iconImage.setAttribute("src", "images/002-temperature-1.png");
          break;
        case (icon < 800): // atmosphere
          iconImage.setAttribute("src", "images/009-wind-1.png");
          break;
        case (icon === 800): // clear
          iconImage.setAttribute("src", "images/016-sun.png");
          break;
        case (icon > 800): // cloud
          iconImage.setAttribute("src", "images/015-cloud.png");
          break;
        default:
          alert("none");
          break;
      }

      // dynamically changes HTML to reflect weather data
      document.getElementById("location").innerHTML = `<strong>${response.name}</strong>`;
      document.getElementById("status").innerHTML = `Status: ${response.weather[0].main}`;
      document.getElementById("temperature").innerHTML = `Temperature: ${response.main.temp} degrees`;
      document.getElementById("humidity").innerHTML = `Humidity: ${response.main.humidity}%`;
      document.getElementById("wind").innerHTML = `Wind: ${response.wind.speed} mph`;
    }
  }
}

getLocation();
