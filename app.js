let tempUnit = "C";
let temp, city, skyconStr, temperature;
console.log(apiKey);type="module"


const unitChange = () => {
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

const search = async (city) => {
    const fetchResponse =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const jsonResponse = await fetchResponse.json()
    return response = {
      city: jsonResponse.name,
      temp: jsonResponse.main.temp,
      weather: jsonResponse.weather[0].main,
  }
}

const iconGen = (desc) => {
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

const searchWeather = () => {
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
      iconGen(skyconStr);
      skycons.play();
    })
}

document.getElementById("weatherForm").addEventListener("submit", () => {
  event.preventDefault();
  searchWeather();
})