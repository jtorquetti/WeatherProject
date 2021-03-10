//jshint esversion:6
const port = 3000;
const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator');


const app = express();  
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))

app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html")


        } );

app.post("/", [
    check('city').isLocale()],
    function(req, res){
        
        var city = (req.body.city)
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=760eac402e0f4d9483f8271d42dbe012&units=metric"
    
        https.get(url, function(response){
            if (response.statusCode != 200){
                res.send("<body style='text-align: center;background: #ffc75f;'><h1 style='color: #845ec2; text-align: center;'>[ERROR]Please type a valid city name!</h1></body>")
            } else {
            response.on("data", function(data){
                const weatherData = JSON.parse(data)
                const temperature = weatherData.main.temp
                const description = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
                res.set("Content-Type", "text/html");
                res.write("<title>Weather in "+city+"</title><body style='text-align: center;background: #ffc75f;font: normal 15pt Arial;color:#845ec2;'><header style:'color: #845ec2;text-align: center;><h1>Live Weather</h1></header></header><section style='background: #a4ebf3;border-radius: 10px;padding: 15px;width: 750px;margin: auto;box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.363);'><h3>The weather is currently "+ description +"</h3><br/><img src="+imgUrl+"><br/><h2>The temperature in "+city+" is " + temperature + " degrees celcius.</h2></section></body><footer><p style='color: #ff5e78;'>© Copyright 2021 JoaoTorquetti</p></footer>")
                res.send()
                })
        }
        })
    })
   

app.listen(port)