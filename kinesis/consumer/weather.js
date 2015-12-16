function checkWeather(shardIterator) {
  console.log("checkWeather");

  var params = {
    ShardIterator: shardIterator, /* required */
    Limit: 100
  };
  kinesis.getRecords(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      // successful response
      data.Records.forEach(obtainAndTabulateWeather);
      var nextCheckWeather = checkWeather.bind(undefined, data.NextShardIterator);
      setTimeout(nextCheckWeather, 3000);
    }
  });
}

function obtainAndTabulateWeather(locationElement, index, array) {
  locationObject = JSON.parse(
    Utils.Uint8ToString(locationElement.Data)
  );
  requestWeather(locationObject, tabulateWeather);
}

function requestWeather(locationObject, callbackFunction) {
  var xhr = new XMLHttpRequest();
  var publicWeatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?" +
    "lat=" + locationObject.latitude + "&lon=" + locationObject.longitude +
    "&appid=2de143494c0b295cca9337e1e96b00e0";

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        callbackFunction(locationObject, JSON.parse(xhr.responseText));
    }
  };

  xhr.open("GET", publicWeatherApiUrl, true);
  xhr.send();
}

function tabulateWeather(locationObject, weatherData) {
  var tableRow = document.getElementById(locationObject.id);
  if (!!tableRow) {
    var weatherCell = tableRow.insertCell(3);
    var temperatureKelvin = weatherData.main.temp;
    var temperatureFarenheit = kelvinToFarenheit(temperatureKelvin);
    var description = weatherData.weather[0].main;
    var weatherString = "";
    if (!!temperatureFarenheit) {
      weatherString += parseFloat(temperatureFarenheit).toFixed(0) + "\xB0F";
    }
    if (!!description) {
      weatherString += ", " + description
    }
    var weatherText = document.createTextNode(weatherString);
    weatherCell.appendChild(weatherText);
  }
}

function kelvinToFarenheit(temp) {
 return ((temp - 273.15) * (9.0/5.0)) + 32
}
