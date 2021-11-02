const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.use(bodyParser.urlencoded({extended: true}));

app.post("/",function(req,res){
  const query = req.body.cityName
  const apiKey = "5d5b1b2f2067042aebe683ce810e64fb"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey +"&units=" + unit;

  https.get(url,function(response){

    response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp
    const desc = weatherData.weather[0].description
    res.write("<h1>Temp in " + query + " : " + temp +"</h1>");
    const icon = weatherData.weather[0].icon
    const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
    res.write("<img src = " + imageUrl + ">");
    res.send();
    });

  });
});



app.listen(3000,function(){
  console.log("Server is running on : 3000")
});
