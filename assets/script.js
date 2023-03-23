// // Populate history list from local storage when page loads
const history = JSON.parse(localStorage.getItem("cities")) || []; //JSON.parse = converts JSON notation into a regular JavaScript object // getItem = returns value  of the specified storage object item. // (" ") = HTML ID where value goes?
const historySection = document.querySelector("#history"); // set variable for HTML ID called history (line 65)
// //Set variable to access search form in HTML
const userInput = document.querySelector("#search-input"); //(.value) = select class  // (#value) = select ID
const searchBtn = document.querySelector("#search-button");

//Open Weather APIKey
const apiKey = "218a901e53733b9ac26b20f0818fba33"; //weather API Key
let cities = []; // global scope - make sure its outside of function otherwise
//cities = history;

function executeSearch(cityName) {
  const queryURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=5&appid=" +
    apiKey;

  axios.get(queryURL).then(function (georesponse) {
    const lat = georesponse.data[0].lat;
    const lon = georesponse.data[0].lon;

    console.log(georesponse);

    const weatherQueryURL =
      "https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey;

    axios.get(weatherQueryURL).then(function (response) {
      const cityData = response.data;

      //Call 5 day weather forecast API after we have city lat and lon value

      //Set variable called weatherList to search through the entire list:Array (40 items)
      const weatherList = cityData.list;
      var j = 0;

      // Each object in the above array is every 3 hours so pick out one in very 8 to have 1 per day for 5 days
      for (let i = 0; i < weatherList.length; i += 8) {
        const weather = weatherList[i];
        console.log(response);

        // Get todays date
        const today = weatherList[0];
        const todayTimestamp = today.today;

        // getting the data only (without time) using moment.js to convert unix
        const timestamp = weatherList[i].dt;
        const dateConverted = moment.unix(timestamp).format("dddd DD/MM/YYYY");

        //adding the location information, with city and country
        const locationDate =
          response.data.city.Name +
          ", " +
          response.data.city.country +
          " on " +
          dateConverted +
          " is:";

        // the icon for the current weather

        const icon =
          "https://openweathermap.org/img/wn/" +
          weatherList[i].weather[0].icon +
          "@2x.png";

        // the temperature
        const temp = " Temp: " + weatherList[i].main.temp.toFixed(1) + " °C";
        // windspeed
        const wind = " Wind: " + weatherList[i].wind.speed + " KPH";

        // the humidity
        const humidity = " Humidity: " + weatherList[i].main.humidity + "%";

        //console logging the whole report to check
        //const weatherResult = locationDate + icon + temp + wind + humidity;
        //console.log(weatherResult);

        if (j === 0) {
          // document.querySelector("today").innerHTML = "";
          document.querySelector(".location").innerHTML =
            "The weather in " + cityName + " on " + dateConverted + " is ";
          document.querySelector(".temp").innerHTML = temp;
          document.querySelector(".wind").innerHTML = wind;
          document.querySelector(".humidity").innerHTML = humidity;
          document.querySelector(".icon").src = icon;
        } else {
          const forecast = document.createElement("div");
          forecast.classList.add("card", "col-md-2", "mb-3");
          forecast.innerHTML =
            "<h5>" +
            dateConverted +
            "</h5>" +
            "<img class='icon' src='" +
            icon +
            "'>" +
            "<p class='card-text temp'>" +
            temp +
            "</p>" +
            "<p class='card-text wind'>" +
            wind +
            "</p>" +
            "<p class='card-text humidity'>" +
            humidity +
            "</p>";
          document.querySelector("#fiveDayForecast").appendChild(forecast);
        }
        j++;
        if (j > 6) break;
      }

      // displays last city searched for or default value
    });
  });
}

function makeButton(city) {
  const button = document.createElement("button");
  button.textContent = city;
  button.className = "search-button";
  // add an event listener to each button
  historySection.appendChild(button);
}

function addCityToSearchHistory() {
  if (history.length) {
    for (let i = 0; i < history.length; i++) {
      makeButton(history[i]);
    }
  }
}

function runSearchAgain(e) {
  console.log("The event is", e);
  const thingClicked = e.target;
  if (thingClicked.matches("button")) {
    // run executeSearch function
    executeSearch(thingClicked.textContent);
  }
}

addCityToSearchHistory();

// Call Geocoding API when search form is submitted to find city lat and long value
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const cityName = userInput.value;
  // if user input is NOT an empty string, add it to history array
  // and set history array to local storage; also create new button
  // and add to history div
  if (cityName) {
    history.push(cityName);
    // now push the updated history to local storage, right?
    localStorage.setItem("cities", JSON.stringify(history));
    // and make the corresponding button
    makeButton(cityName);
  }

  // execute the search here
  executeSearch(cityName);
});

historySection.addEventListener("click", runSearchAgain);
