
// TODO: add location getting -- currently only works for phoenix

function getWeather() {
  var request = new XMLHttpRequest();

  request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?id=5308655&units=imperial&APPID=cf6da6d6f0df9e748deb7ac9a6b0b174', true);
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

      // dynamically changes HTML to reflect weather
      document.getElementById("location").innerHTML = `<strong>${response.name}</strong>`;
      document.getElementById("status").innerHTML = `Status: ${response.weather[0].main}`;
      document.getElementById("temperature").innerHTML = `Temperature: ${response.main.temp} degrees`;
      document.getElementById("humidity").innerHTML = `Humidity: ${response.main.humidity}%`;
      document.getElementById("wind").innerHTML = `Wind: ${response.wind.speed} mph`;
    }
  }
}

getWeather();
