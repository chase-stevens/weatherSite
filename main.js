
// TODO: add location getting -- currently only works for phoenix

function getWeather() {
  var request = new XMLHttpRequest();

  request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?id=5308655&units=imperial&APPID=cf6da6d6f0df9e748deb7ac9a6b0b174', true);
  request.send();

  request.onreadystatechange = processRequest;

  function processRequest(e){
    if (request.readyState === 4 && request.status === 200) {
      var response = JSON.parse(request.responseText);
      document.getElementById("location").innerHTML = `Location: ${response.name}`;
      document.getElementById("status").innerHTML = `Status: ${response.weather[0].main}`;
      document.getElementById("temperature").innerHTML = `Temperature: ${response.main.temp} degrees`;
      document.getElementById("humidity").innerHTML = `Humidity: ${response.main.humidity}%`;
      document.getElementById("wind").innerHTML = `Wind: ${response.wind.speed} mph`;
    }
  }
}

getWeather();
