const apiKey = 'cf18e866d7a3ab178f8742170d486f74';

async function getWeather() {
    const location = document.getElementById('location-input').value;
    if (!location) {
        alert("Please enter a location.");
        return;
    }

    const weatherDisplay = document.getElementById('weather-display');
    weatherDisplay.innerHTML = "Loading...";

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("Please enter a valid loaction.");
        }
        const weatherData = await response.json();

        const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

        const weatherHtml = `
    <div class="weather-detail">
        <h2>${weatherData.name}</h2>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Weather: ${weatherData.weather[0].description}</p>
        <img src="${iconUrl}" alt="Weather Icon">
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
    </div>
`;
        weatherDisplay.innerHTML = weatherHtml;
    } catch (error) {
        weatherDisplay.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}