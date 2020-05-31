const request = require('request')

const geocode =(address,callback) => {
    const geocoding_api='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1IjoidXRrYXJzaGdvZWwiLCJhIjoiY2thcGxwanE3MGI1bzJxbXNxNHhnNGh1byJ9.VlqmGZDuSWvJ3aF8DGAcHA'
    request({
        url : geocoding_api,
        json : true
    },(error,{body}={})=>{
        if(error){
            callback('Unable to connect to Location services',undefined)
        }
        else if(body.features.length === 0)
        callback('No such location found. Please try again.',undefined)
        else{
            callback(undefined, {
                name : body.features[0].place_name,
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode