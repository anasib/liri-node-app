//liri runs the following commands
// `my-tweets`
// `spotify-this-song`
// `movie-this`
// `do-what-it-says`
    
var env = require("dotenv").config();
var dataKeys = require("./keys.js");
var fs = require("fs");
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);