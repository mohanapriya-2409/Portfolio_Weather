document.addEventListener('DOMContentLoaded', function() {
const container = document.querySelector('.container');
const search = document.querySelector('.searchbox button');
const weatherbox = document.querySelector('.weatherbox'); 
const weatherdetails = document.querySelector('.weatherdetails'); 
const error = document.querySelector('.notfound');
const cityhide = document.querySelector('.cityhide');

search.addEventListener('click', async() => {
    const APIKey = "f078eb09ecfc210269e00feb97ae126b";
    const city = document.querySelector('.searchbox input').value;
    if (city.trim() == "") 
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if(json.cod == '404'){
                cityhide.textContent=city;
                container.style.height ='500px';
                weatherdetails.classList.remove('active');
                weatherbox.classList.remove('active');
                error.classList.add('active');
                return;
             }
            
             

            const image = document.querySelector('.weatherbox img');
            const tempr = document.querySelector('.weatherbox .temp'); 
            const description = document.querySelector('.weatherbox .description');
            const humidity = document.querySelector('.weatherdetails .humidity span');
            const wind = document.querySelector('.weatherdetails .wind span');

            if(cityhide.textContent == city){
                return;
            }
            else{
                cityhide.textContent=city;
                container.style.height ='555px';
                weatherdetails.classList.add('active');
                weatherbox.classList.add('active');
                error.classList.remove('active');

                setTimeout(() => {
                    
                },2500);
            
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear1.png';
                    break;
                case 'Sunny':
                    image.src = 'sunny.png';
                    break;
                case 'Rain':
                    image.src = 'rain.png';
                    break;
                case 'Clouds':
                    image.src = 'cloudy.png';
                    break;
                case 'Snow':
                    image.src = 'snow.png';
                    break;
                case 'Fog':
                case 'Mist':
                case 'Haze':
                    image.src = 'foggy.png';
                    break;
                default:
                    image.src = '3721962.png';
            }
        tempr.innerHTML =`${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML=`${json.weather[0].description}`;
        humidity.innerHTML=`${json.main.humidity}%`;
        wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`;

        }

        
        });
});
});