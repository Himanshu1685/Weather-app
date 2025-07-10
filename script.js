const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';
const url = 'https://api.openweathermap.org/data/2.5/weather';

const backgroundMap = {
  Clear: 'sunny',
  Clouds: 'cloudy sky',
  Rain: 'rain',
  Snow: 'snow',
  Thunderstorm: 'storm',
  Mist: 'fog',
  Haze: 'haze',
  Drizzle: 'drizzle'
};

document.addEventListener("DOMContentLoaded", () => {
  fetchWeather("Noida");

  document.getElementById("city-input-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city) fetchWeather(city);
    else alert("Please enter a city name.");
  });

  // Theme toggle button
  const themeBtn = document.getElementById("theme-toggle");
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");

    themeBtn.textContent = document.body.classList.contains("dark")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
  });
});

async function fetchWeather(city) {
  const endpoint = `${url}?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(endpoint);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to fetch weather");

    displayWeather(data);
  } catch (err) {
    alert("Error: " + err.message);
  }
}

function displayWeather(data) {
  document.getElementById("city-name").textContent = data.name;
  document.getElementById("date").textContent = moment().format('MMMM Do YYYY, h:mm:ss a');
  document.getElementById("temperature").innerHTML = `${Math.round(data.main.temp)}°C`;
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("wind-speed").textContent = `Wind Speed: ${data.wind.speed} m/s`;
  document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("weather-info").style.display = "block";

  const condition = data.weather[0].main;
  const keyword = backgroundMap[condition] || "weather";
  document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${encodeURIComponent(keyword)}')`;
}
