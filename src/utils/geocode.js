const request = require('request')


// Mapbox API response


const geocode = (address, callback) => {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamFja3J1bmdheSIsImEiOiJja3BqbTQ3dTUwYWF6MnBvYWMxYmw2Yzl2In0.J95pWqA7QGu7SKQoxeQXPQ&limit=1`

    request({url: geocodeUrl, json: true }, (error, response) => {

        const { body } = response // destructuring the body off response

        if (error) {
            callback("Unable to connect to Map Service.", undefined)
        } else if (body.message) {
            callback(`${body.message}`)
        } else if (body.features.length === 0) {
            callback("No responses found for this search query. Try again", undefined)
        } else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const placeName = body.features[0].place_name

            callback(undefined, {
                latitude, // object property shorthand
                longitude,
                location: placeName
            })
        }
    })
}


module.exports = geocode