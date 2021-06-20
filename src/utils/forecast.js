const request = require('request')


const forecast = (lat, long, callback) => {
    const forecastUrl = `http://api.weatherstack.com/current?access_key=3c141ac0e8f072f0846b6c8e37713ab5&query=${lat, long}`

    request({url: forecastUrl, json: true}, (error, response) => {

        const { body } = response // destructuring the body off response
        
        if (error) {
            callback("Unable to connect to Weather Service.", undefined)
        } else if (response.body.success === false) {
            callback(`Cordinates invalid. ${body.error.info}`, undefined)
        } else {

            console.log(body, "What is happening here?")

            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike}  degrees out.`)
        }
    })
}

module.exports = forecast