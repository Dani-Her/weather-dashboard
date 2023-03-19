let weather = {
    "apiKey": "fa022f61728520158a5e26d33b931081",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid=" + this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);

        var results = $("response");
        results.addClass("results");
        results.attr("data-name");
        results.text(city)
        $(".form").append(results);

        cities.push(City)

        if (localStorage.getItem("allCities")) {
            var citiesString = [...cities, ...JSON.parse(localStorage.getItem("allCities"))]
            var noDuplicates = citiesString.filter((item, index) => citiesString.indexOf(item) === index);
            noDuplicates = JSON.stringify(noDuplicates);
            localStorage.setItem("allCities", noDuplicates)
        } else {
            var citiesString = JSON.stringify(cities)
            localStorage.setItem("allCities", citiesString)
        }

        console.log(cities)
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("London");


function renderCitiesLocalStorage() {
    var citiesArray = JSON.parse(localStorage.getItem("allCities"))

    for (var i = 0; i < citiesArray.length; i++) {

        var results = $("response");
        results.addClass("results");
        results.attr("data-name", citiesArray[i]);
        results.text(citiesArray[i]);
        $(".form").append(results);
        results.on("click", function () {
            event.preventDefault();
            displayWeather($(this).attr("data-name")); 
        })
    }


};

if (localStorage.getItem("allCities")) {
    renderCitiesLocalStorage();
};




