// Recupero gli elementi di interesse dalla pagina
const htmlElement = document.documentElement;
const suggestion = document.querySelector('.suggestion');
const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');
const cities = [
  {
    nameCity: 'milano',
    latitude: '45.463667289676515',
    longitude: '9.189402470995264',
  },
  {
    nameCity: 'parigi',
    latitude: '48.85704894318469',
    longitude: '2.3551795129291175',
  },
  {
    nameCity: 'berlino',
    latitude: '52.52386134133977',
    longitude: '13.391076552142973',
  },
  {
    nameCity: 'manila',
    latitude: '14.595648377672013',
    longitude: '120.99453625022065',
  },

]



// Provo a recuperare la mia posizione
navigator.geolocation.getCurrentPosition(onSuccess, onError);

// Funzione da eseguire in caso di errore
function onError() {
  // Preparo degli elementi in pagina per far capire che va attivata
  weatherLocation.innerText = '';
  weatherIcon.alt = "Geolocation disattivata";
  weatherIcon.src = "images/geolocation_disabled.png";
  suggestion.innerText = 'Attiva la geolocalizzazione';


  // Disattivare il loading
  htmlElement.className = '';
}

// Funzione da eseguire in caso di successo
async function onSuccess(position) {

  // Recupero latitudine e longitudine
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;


  // Prepariamoci a chiamare l'API do Open Weather
  const API_KEY = 'bd832622acc99b03e95f5648052a97cf';
  const units = 'metric';
  const lang = 'it';

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}&lang=${lang}`;


  // Chiamo e API di Open Weather
  const response = await fetch(endpoint);
  const data = await response.json();

  

  const iconCode = data.weather[0].icon;
  const description = data.weather[0].description;
  //Ora di tramonto e alba
  //const sysSunrise = data.sys.sunrise;
  //const sysSunset = data.sys.sunset;
  //let ora ={sysSunrise,sysSunset};
  console.log(data)
  // Riempio gli elementi della pagina

  weatherLocation.innerText = data.name;
  weatherIcon.alt = description;
  weatherIcon.src = `images/${iconCode}.gif`;
  weatherTemperature.innerText = `${Math.floor(data.main.temp)}°`;
  suggestion.innerText = suggestions[iconCode];

  // Cambio colore di sfondo
  if(iconCode[2] == 'd'){
    console.log('giorno')
    document.body.style.backgroundColor = '#4c64f2';
  } else {
    console.log('notte')
    document.body.style.backgroundColor = '#252850';
  }
  console.log(iconCode[2]);


  // Disattivare il loading
  htmlElement.className = '';
}

/*function parigi(){
  const latitude = '48.85704894318469';
  const longitude = '2.3551795129291175';


  // Prepariamoci a chiamare l'API do Open Weather
  const API_KEY = 'bd832622acc99b03e95f5648052a97cf';
  const units = 'metric';
  const lang = 'it';

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}&lang=${lang}`;


  // Chiamo e API di Open Weather
  const response = fetch(endpoint);
  const data = response.json();

  

  const iconCode = data.weather[0].icon;
  const description = data.weather[0].description;
  //Ora di tramonto e alba
  const sysSunrise = data.sys.sunrise;
  const sysSunset = data.sys.sunset;
  let ora ={sysSunrise,sysSunset};
  console.log(data,sysSunrise,sysSunset);
  // Riempio gli elementi della pagina

  weatherLocation.innerText = data.name;
  weatherIcon.alt = description;
  weatherIcon.src = `images/${iconCode}.png`;
  weatherTemperature.innerText = `${Math.floor(data.main.temp)}°`;
  suggestion.innerText = suggestions[iconCode];

  // Cambio colore di sfondo
  if (new Date() / 1000 < ora.sysSunset){
    console.log('giorno');
  }else{
    document.body.style.backgroundColor = '#252850';
    console.log('notte');
  }

  // Disattivare il loading
  htmlElement.className = '';
  console.log('prova');
}*/

async function clickCity(id){
  let currentLat = 0;
  let currentLon = 0;
  cities.forEach(element => {
    if(id == element.nameCity){
      currentLat = element.latitude;
      currentLon = element.longitude;
    }
  });
  const result = await callApi(currentLat, currentLon);
  if (!result){
    console.error('errore');
  }
  render(result);
}

async function callApi(latitude,longitude){
  if(latitude == 0 && longitude == 0){
    return false;
  }
  const API_KEY = 'bd832622acc99b03e95f5648052a97cf';
  const units = 'metric';
  const lang = 'it';

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}&lang=${lang}`;


  
  const response =  await fetch(endpoint);
  const data = await response.json();
  return data;
}

function render(data){
  const iconCode = data.weather[0].icon;
  const description = data.weather[0].description;
  //const sysSunrise = data.sys.sunrise;
  //const sysSunset = data.sys.sunset;
  //let ora ={sysSunrise,sysSunset};
  console.log(data);

  weatherLocation.innerText = data.name;
  weatherIcon.alt = description;
  weatherIcon.src = `images/${iconCode}.gif`;
  weatherTemperature.innerText = `${Math.floor(data.main.temp)}°`;
  suggestion.innerText = suggestions[iconCode];

  if(iconCode[2] == 'd'){
    console.log('giorno')
    document.body.style.backgroundColor = '#4c64f2';
  } else {
    console.log('notte')
    document.body.style.backgroundColor = '#252850';
  }
  //console.log(iconCode[2]);
  htmlElement.className = '';
}

