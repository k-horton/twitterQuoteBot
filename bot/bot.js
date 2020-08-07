var twit = require('twit');
var config = require('./config.js');
const fetch = require('node-fetch');

var Twitter = new twit(config);
var quotesURL = 'https://gist.githubusercontent.com/k-horton/'
  + 'ea67de7d1f2c55ba54383398c629b0e3/raw/'
  + '8352f411314639a6e37e820193c98078e57382ec/quotes.json';

var postTweet = async function() {
  var params = {
    q: '#nodejs, #Nodejs',
    result_type: 'recent',
    lang: 'en'
  }

  // todo: pull the thing to tweet here
  var tweetToTweet = 'test tweet';
  var json = await fetch(quotesURL)
    .then(res => res.json())
    .catch(function(err) {
        console.log('error: ', err);
    });

  tweetToTweet = getRandomQuote(json);

  console.log("tweeting: " + tweetToTweet);

  // MAKE A POST
  Twitter.post('statuses/update',
    { status: tweetToTweet },
    function(err, data, response) {
      console.log(data)
    }
  );
}

function getRandomQuote(quotesJSON) {
  const keys = Object.keys(quotesJSON);
  const randKey = Math.floor(Math.random() * keys.length);
  const randPerson = keys[randKey];

  var person = quotesJSON[randPerson];
  console.log("person: " + person);
  var quote = person[Math.floor(Math.random() * (Object.keys(person).length + 1))];

  return quote;
}

postTweet();

// tweets every 50*12 minutes (so like almost every 12 hrs)
setInterval(postTweet, 3000000*12);
