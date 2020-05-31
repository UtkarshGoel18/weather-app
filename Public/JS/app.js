const form = document.querySelector('form')
const key = document.querySelector('input')
const locationInfo= document.querySelector('#location-info')
const forecastMain= document.querySelector('#forecast-main')

form.addEventListener('submit', (e) => {
    // just to prevent re loading
    
    e.preventDefault()
    
    const url = '/weather/?address='+decodeURIComponent(key.value)

    locationInfo.textContent='Loading...'
    forecastMain.textContent=''


    fetch(url).then( (res)=>{
        res.json().then((data)=>{
            if(data.error)
            {
                locationInfo.textContent = data.error               
            }
            else {
                locationInfo.textContent=data.location
                forecastMain.textContent=(data.forecast.weather[0].main)+': '+(data.forecast.weather[0].description)+'. \nIt is '+data.forecast.temp+'°C. Feels like '+data.forecast.feels_like+'°C with '+data.forecast.humidity+'% humidity.'
            }
            

            console.log(data.forecast)
        })

    }) 
})

