// // Populate history list from local storage when page loads
// const history = JSON.parse(localStorage.getItem("history")) || [];
const history = document.querySelector("#history");
//Open Weather APIKey
const apiKey = "218a901e53733b9ac26b20f0818fba33"; //weather API Key

// //Set variable to access search form in HTML
const userInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-button");

// Add the history to local storage
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const cityName = userInput.value;
  // Save search term as key-value pair in local storage
  localStorage.setItem(cityName, cityName);

  // Create button for search term
  var button = document.createElement("button");
  button.className = "search-button";
  button.innerHTML = cityName;
  history.appendChild(button);

  const queryURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=5&appid=" +
    apiKey;

  // Call Geocoding API when search form is submitted to find city lat and long value
  axios.get(queryURL).then(function (georesponse) {
    const lat = georesponse.data[0].lat;
    const lon = georesponse.data[0].lon;

    const weatherQueryURL =
      "https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey;
    console.log(georesponse);
    //   axios.get(weatherQueryURL).then(function (weatherResponse) {
    //     const cityData = response.data;
    //   });
  });
});
// Call 5 day weather forecast API after we have city lat and lon value

// Icon URL http://openweathermap.org/img/w/" + iconcode + ".png"

// Put the response on the HTML page
//     const weatherList = weatherResponse.list;

//     // 5 days forecast
//     for (let i = 1; i < weatherList.length; i += 8) {
//       const weather = weatherList[i];
//       console.log(weather);
//     }

//     const today = weatherList[0];
//     const todayTimestamp = today.today;
//     console.log(todayTimestamp);

//     const temp = document.createElement("p");
//     (weatherList[i].main.temp - 273.15).toFixed(1) + " °C";
//     //   var wind = document.createElement("p");
//     //   var humidity = document.createElement("p");
//   });

//   // history.pushState(userInput);
//   // localStorage.setItem("temp");

//   // localStorage.setItem("history", JSON.stringify(history))
// });
