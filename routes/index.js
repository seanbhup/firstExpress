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



router.get("/blackjack", function(req,res,next){
    res.render("blackjack", {});
});

router.get("/search", function(req,res,next){
    res.render("search", {});
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

router.post("/searchMovie", (req,res,next)=>{
    var config = {
        apikey: "&api_key=55e2d237df80ec5178651841fda5124c",
        baseUrl: 'http://api.themoviedb.org/3/',
        imageBase: 'http://image.tmdb.org/t/p/w300',
        imageBaseFull: 'http://image.tmdb.org/t/p/original',
        nowPlayingEP: 'movie/now_playing?',
    };

    var searchString = encodeURI(req.body.movieSearch);
    var queryUrl = config.baseUrl + "search/movie?" + config.apikey + "&query=" + searchString;
    // res.send(queryUrl);
    request.get(queryUrl, (error, response, searchData)=>{
        searchData = JSON.parse(searchData);
        res.render("movie", {
            movieArray: searchData.results,

        });
    })
});

router.get("/searchMovie", (req,res,next)=>{
    res.send("im get route");
})

module.exports = router;
