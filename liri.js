//liri runs the following commands
// `my-tweets`
// `spotify-this-song`
// `movie-this`
// `do-what-it-says`

// var env = require("dotenv").config();
// var dataKeys = require("./keys.js");
// var fs = require("fs");
// var twitter = require('twitter');
// var spotify = require('spotify');
// var request = require('request');

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);


require("dotenv").config();

var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require('fs');

var spotify = new Spotify(keys.spotify);



var getMyTweets = function () {

    var client = new Twitter(keys.twitter);

    var params = { screen_name: 'NasibAtta' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            }
        }

    });
}

var getArtistNames = function (artist) {
    return artist.name;
}


var getMeSpotify = function (songName) {
    if (songName === undefined) {
        songName = "whats my age";
    }


    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);

        }
    });
}

var getMovie = function (movieName) {


    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body);
            console.log('Title: ' + jsonData.Title);
            console.log('Year: ' + jsonData.Year);
            console.log('IMDB Rating: ' + jsonData.imdbRating);
            //    console.log('Rotten Tomatoes Rating: ', + jsonData.tomatoRating);
            console.log('Country: ' + jsonData.Country);
            console.log('Language: ' + jsonData.Language);
            console.log('Plot: ' + jsonData.Plot);
            console.log('Actors: ' + jsonData.Actors);

        }

    });
}



var doWhatItSays = function () {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;

        var dataArr = data.split(',');

        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            pick(dataArr[0]);
        }
    });
}


var pick = function (caseData, functionData) {

    console.log('caseData:', caseData)

    switch (caseData) {
        case 'my-tweets':
            getMyTweets();
            break;
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case 'movie-this':
            getMovie(functionData);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log('LIRI does not know that');
    }
}

var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
