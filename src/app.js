const path = require("path")
const express = require("express")
const hbs = require('hbs')

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const port = process.env.PORT || 3000  
  
const app = express()

// Define path for Express config
const publicDirectory = path.join(__dirname, "../public")
const viewDirectory = path.join(__dirname, "../templates/views")
const partialsDirectory = path.join(__dirname, "../templates/partials")


// Setup handlebars engine and view location

app.set("view engine", "hbs" )
app.set('views', viewDirectory)
hbs.registerPartials(partialsDirectory)




// Setup static directory to serve 

app.use(express.static(publicDirectory))

app.get("", (req, res) => {
    res.render("index", { 
        title: "Weather",
        name: "Jack Rungay"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Jack Rungay"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        message: "This is my help page",
        title: "Help",
        name: "Jack Rungay"
    })  
})


app.get("/weather", (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must provide a address"
        })
    }

    geocode(req.query.address, (error, data) => {

        if (error) {
            return res.send({
            error: error
            })
        }
        
        const { longitude, latitude, location } = data
        

        forecast(longitude, latitude, (error, forecastData) => {
            
            if (error) {
                return res.send({
                error: error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })    
})

app.get("/products", (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        message: "Article Not Found!",
        title: "404",
        name: "Jack Rungay"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        message: "There is nothing here!",
        title: "404",
        name: "Jack Rungay"
    })
})





app.listen(port, () => {
    console.log(`Server is up and running on ${port}` )
})



 