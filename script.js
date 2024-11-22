const searchButton = document.querySelector('#button');
const searchWeather = document.querySelector('.weather');
const searchError = document.querySelector('.error');
const searchTemp = document.querySelector('.temp');
const searchHumidity = document.querySelector('.humidity');
const searchWindSpeed = document.querySelector('.wind');

searchButton.addEventListener('click', () => {
  const city = document.querySelector('#input').value;
  if (!city || city.trim() === '') {
    searchError.style.display = 'block';
    searchWeather.style.display = 'none';
    searchError.innerHTML = `Пшёл нах.`;
  }else if (city) {
    fetchWeather(city);
  }
});

async function fetchWeather(city) {
  await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=b5a4fc0b9e52d1843f90838227bb8bef`)
    .then((response) => response.json())
    .then((post) => {
      if (post.cod === '404') {
        searchError.style.display = 'block';
        searchWeather.style.display = 'none';
        searchError.innerHTML = `Пшёл нах.`;
        return;
      }
      searchTemp.innerHTML = `${Math.round(post.main.temp)} &#8451`;
      searchHumidity.innerHTML = `${post.main.humidity}%`;
      searchWindSpeed.innerHTML = `${Math.round(post.wind.speed)} km/h`;

      searchWeather.style.display = 'block';
      searchError.style.display = 'none';
    })
    .catch((error) => {
      console.error('Ошибка при загрузке данных:', error);
    });
}


