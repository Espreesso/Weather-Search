var tempUnit = "C";
let temp, city, skyconStr, temperature;


let unitChange = () => {
    if (tempUnit === "C") {
        temperature = Math.round((temperature * 9/5) + 32);
        document.getElementById("unitchange").innerHTML = "°F";
        document.getElementById("temp").innerHTML = temperature
        tempUnit = "F";
    } else {
        temperature = Math.round((temperature - 32) * 5/9);
        document.getElementById("unitchange").innerHTML = "°C";
        document.getElementById("temp").innerHTML = temperature
        tempUnit = "C";
    }
}


function search(city) {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=59e9fd23a00d4aeae53499faec6ab2f1`)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            return response = {
                city: jsonResponse.name,
                temp: jsonResponse.main.temp,
                weather: jsonResponse.weather[0].main,
            }
        })
}

function searchWeather() {
    currentWeather = search(document.getElementById("locationsearch").value)
    .then((response) => {
    document.getElementById("location").innerHTML = response.city;
    if (tempUnit === "C") {
        temperature = Math.round(response.temp - 273.3);
    } else {
        temperature = Math.round((response.temp * 9/5) - 459.67);
    }
    document.getElementById("temp").innerHTML = temperature;
    document.getElementById("unitchange").style.display = "inherit";
    document.getElementById("forecast").innerHTML = response.weather;
    skyconStr = response.weather.toLowerCase();
    function iconGen(desc) {
        switch (desc) {
          case 'drizzle':
            skycons.add("icon1", Skycons.FOG);
            break;
          case 'clouds':
            skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
            break;
          case 'rain':
            skycons.add("icon1", Skycons.RAIN);
            break;
          case 'snow':
            skycons.add("icon1", Skycons.SNOW);
            break;
          case 'clear':
            skycons.add("icon1", Skycons.CLEAR_DAY);
            break;
          case 'thunderstom':
            skycons.add("icon1", Skycons.RAIN);
            break;
        }
    }
    iconGen(skyconStr);
    skycons.play();
    })
}

document.getElementById("locationsearch").addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("myBtn").click();
    }
  }); 