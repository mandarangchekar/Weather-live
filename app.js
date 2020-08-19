const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    var cityName = (req.body.cityName);

    const query = cityName;
    const apiKey = "c83694f2ccad9cfdf291197efd4e7621";
    const temperature = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q=" +query+ "&units="+temperature;
    https.get(url, function(response){
        response.on("data", function(data){

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;

            res.write("<h1>The temperature in "+query+" is "+temp+ "degree celsius</h1>");
            res.write("<p>The weather forecast is "+description+"</p>");
            res.write("Thank you for using");
            res.send();

        });


    });

});
app.listen(3000, function(){
    console.log("Server is up and running.")
});
