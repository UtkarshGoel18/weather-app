const request = require('request')

const forecast=(lat,lon,callback) => {
    const weather_api= 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=metric&appid=756e7bd6c4d20aee84af4fc937dca253'

    request({
        url : weather_api,
        json:  true
    },(error, {body}={}) => {
        if(error) {
            callback('Unable to Connect to weather services!',undefined)
        }
        else if(body.message){
            callback(response.body.message,undefined)
        }
        else {
            callback(undefined,body)
        }

    })

}

module.exports = forecast