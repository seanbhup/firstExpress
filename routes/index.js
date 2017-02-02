var express = require('express');
var router = express.Router();
var request = require("request");

/* GET home page. */
router.get('/', function(req, res, next) {

    var student1 = "Sean";
    var fruits = ["apple", "banana", "orange", "pear"];

  res.render('index', {
      student: student1,
      fruitArray: fruits
  });
  // res.send("Hello from Express.")
  // res.json({name: "Sean"})
});

router.get("/canvas", function (req, res, next) {
    var fakeData = {
        name: "sean",
        highScore: 23
    }

    res.render("canvasGame", {user:fakeData});
});

router.get("/weather", function(req,res,next){
    var apikey = 'e312dbeb8840e51f92334498a261ca1d';
    var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&APPID="+apikey;
    request.get(weatherUrl, (error, response, weatherData)=>{
        console.log(weatherData);
        // res.send("NODEMON??");
        weatherData = JSON.parse(weatherData);
        res.render("weather", {weatherObject: weatherData});

    });

});

router.get("/movie", function(req,res,next){
    

    var apikey = "55e2d237df80ec5178651841fda5124c"
    var movieUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key="+apikey+"&language=en-US&page=1";
    request.get(movieUrl, (error, response, movieData)=>{
        // res.send("NODEMON??");
        movieData = JSON.parse(movieData);
        console.log(movieData);
        res.render("movie", {movieArray: movieData.results});

    });

});

router.get("/blackjack", function(req,res,next){
    res.render("blackjack", {});
});

module.exports = router;
