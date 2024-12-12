const apiKey = "797c249cf3b220838c705e5670d8abe7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
// const darkm = document.querySelector(".card");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    // console.log(response);


    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";

        Toastify({
            text: "Invalid city name. Please try again!",
            duration: 5000, // 5 seconds
            close: true,
            gravity: "top", // Position on the top of the screen
            position: "center", // Centered horizontally
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // Gradient background
          }).showToast();
    }
    else{
        const data = await response.json();



    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
     else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else{
        weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    }
}
searchBtn.addEventListener("click", ()=>{
    const city = searchBox.value.trim();
    if (city) {
      checkWeather(city);
    } else {
      Toastify({
        text: "Please enter a city name!",
        duration: 3000,
        close: false,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      }).showToast();
    }
})

// function darktheme(){
//     darkm.style.background = "linear-gradient(150deg, #1b2d54, #696346)"
// }
