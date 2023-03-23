// // Populate history list from local storage when page loads
// const history = JSON.parse(localStorage.getItem("cities")); //JSON.parse = converts string into object // getItem = returns value  of the specified storage object item. // (" ") = HTML ID where value goes?
const historySection = document.querySelector("#history"); // set variable for HTML ID called history (line 65)
let priorCitiesArray = JSON.parse(localStorage.getItem('cityNames')) || []; // global scope - make sure its outside of function otherwise// cities = history;
console.log('Global priorCitiesArray is', priorCitiesArray);

//Open Weather APIKey
const apiKey = "218a901e53733b9ac26b20f0818fba33"; //weather API Key

// //Set variable to access search form in HTML
const userInput = document.querySelector("#search-input"); //(.value) = select class  // (#value) = select ID
const searchBtn = document.querySelector("#search-button");

function addToLocalStorage (city) {
  // get from local storage
  // priorCitiesArray = JSON.parse(localStorage.getItem('cityNames'));
  console.log('addToLocalStorage priorCitiesArray is', priorCitiesArray);
  // add the latest searched city to the cities array
  priorCitiesArray.push(city);

  // save to local storage now
  localStorage.setItem('cityNames', JSON.stringify(priorCitiesArray));
}

// Add the history to local storage
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const cityName = userInput.value;

  // run my custom function addToLocalStorage here...
  addToLocalStorage(cityName);


  // Save search term as key-value pair in local storage
  // You can store the value in localStorage with the key value pair. It has two methods setItem(key, value) to store the value in the storage object and getItem(key) to retrieve the value from the storage object. document. getElementById("result").
  //create an empty array
  // cities.push(cityName); //push user city name into the array
  // localStorage.setItem("cities", JSON.stringify(cities)); // set item to local storage
  // console.log(cities);
  // // Create button for search term
  // const button = document.createElement("button");
  // button.className = "search-button";
  // button.innerHTML = cityName;
  // history.appendChild(button);

  const queryURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=5&appid=" +
    apiKey;

  // Call Geocoding API when search form is submitted to find city lat and long value
  axios.get(queryURL).then(function (georesponse) {
    const lat = georesponse.data[0].lat;
    const lon = georesponse.data[0].lon;

    console.log(georesponse);

    const weatherQueryURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${[
      "minutely",
      "hourly",
    ]}&appid=${apiKey}`;
    // "https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=" +
    // lat +
    // "&lon=" +
    // lon +
    // "&appid=" +
    // apiKey;

    axios.get(weatherQueryURL).then(function (response) {
      const cityData = response.data;

      //Call 5 day weather forecast API after we have city lat and lon value

      //Set variable called weatherList to search through the entire list:Array (40 items)
      // const weatherList = cityData.list;
      // var j = 0;

      // Each object in the above array is every 3 hours so pick out one in very 8 to have 1 per day for 5 days
      // for (let i = 0; i < weatherList.length; i += 8) {
      //   const weather = weatherList[i];
      //   console.log(response);

      //   // Get todays date
      //   const today = weatherList[0];
      //   const todayTimestamp = today.today;

      //   // getting the data only (without time) using moment.js to convert unix
      //   const timestamp = weatherList[i].dt;
      //   const dateConverted = moment.unix(timestamp).format("dddd DD/MM/YYYY");

      //   //adding the location information, with city and country
      //   const locationDate =
      //     response.data.city.Name +
      //     ", " +
      //     response.data.city.country +
      //     " on " +
      //     dateConverted +
      //     " is:";

      //   // the icon for the current weather

      //   const icon =
      //     "https://openweathermap.org/img/wn/" +
      //     weatherList[i].weather[0].icon +
      //     "@2x.png";

      //   // the temperature
      //   const temp = " Temp: " + weatherList[i].main.temp.toFixed(1) + " °C";
      //   // windspeed
      //   const wind = " Wind: " + weatherList[i].wind.speed + " KPH";

      //   // the humidity
      //   const humidity = " Humidity: " + weatherList[i].main.humidity + "%";

      //   //console logging the whole report to check
      //   //const weatherResult = locationDate + icon + temp + wind + humidity;
      //   //console.log(weatherResult);

      //   if (j == 0) {
      //     // document.querySelector("today").innerHTML = "";
      //     document.querySelector(".location").innerHTML =
      //       "The weather in " + cityName + " on " + dateConverted + " is ";
      //     document.querySelector(".temp").innerHTML = temp;
      //     document.querySelector(".wind").innerHTML = wind;
      //     document.querySelector(".humidity").innerHTML = humidity;
      //     document.querySelector(".icon").src = icon;
      //   } else {
      //     const forecast = document.createElement("div");
      //     forecast.classList.add("card", "col-md-2", "mb-3");
      //     forecast.innerHTML =
      //       "<h5>" +
      //       dateConverted +
      //       "</h5>" +
      //       "<img class='icon' src='" +
      //       icon +
      //       "'>" +
      //       "<p class='card-text temp'>" +
      //       temp +
      //       "</p>" +
      //       "<p class='card-text wind'>" +
      //       wind +
      //       "</p>" +
      //       "<p class='card-text humidity'>" +
      //       humidity +
      //       "</p>";
      //     document.querySelector("#fiveDayForecast").appendChild(forecast);
      //   }
      //   j++;
      //   if (j > 5) break;
      // }

      // displays last city searched for or default value
    });
  });
});

window.addEventListener("load", function () {
  console.log('window load event happened');
  // get the saved value of a particular key--they key to which you saved all your previous cities to
  // priorCitiesArray = JSON.parse(localStorage.getItem('cityNames')) || [];
  console.log('prior cities array is', priorCitiesArray);
  // const keys = Object.keys(localStorage);
  // console.log("keys are", keys);

  // Loop through prior cities array
  for (let i = 0; i < priorCitiesArray.length; i++) {
    // const key = keys[i];
    // Create button for key
    var button = document.createElement("button");
    button.className = "search-button";
    button.textContent = priorCitiesArray[i];
    historySection.appendChild(button);
    // console.log(button);
  }
});
