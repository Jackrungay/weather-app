const weatherForm = document.querySelector("form")
const search = document.querySelector("input")

const locationText = document.getElementById("location")
const forecastText = document.getElementById("forecast")

console.log("Hello")
 
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const location = search.value

    locationText.innerText = ""
    forecastText.innerText = "Loading..."
    
    
    fetch(`/weather?address=${location}`).then((response) => {

        response.json().then((data) => {

        if (data.error) {
            return forecastText.innerText = data.error
        }
        
        locationText.innerText = data.location
        forecastText.innerText = data.forecast

        })
    })
})