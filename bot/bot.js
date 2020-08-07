var twit = require('twit');
var config = require('./config.js');
const fetch = require('node-fetch');

var Twitter = new twit(config);

// link to a JSON list of quotes goes here - replace with your own URL
    // they should follow the format of { "category": ['array', 'with', 'quotes'] }
    // (or just  { "author": ['quote'] }  works, too )
var quotesURL = '';

var postTweet = async function() {
  var params = {
    q: '#nodejs, #Nodejs',
    result_type: 'recent',
    lang: 'en'
  }

  var tweetToTweet;

  // fetches the JSON list of quotes
  var json = await fetch(quotesURL)
    .then(res => res.json())
    .catch(function(err) {
        console.log('error: ', err);
    });

  tweetToTweet = getRandomQuote(json);

  // print statement just to verify in the console what you're tweeting
  console.log("tweeting: " + tweetToTweet);

  // This method makes the actual post
  Twitter.post('statuses/update',
    { status: tweetToTweet },
    function(err, data, response) {
      console.log(data)
    }
  );
}

/* selects a random quote from the JSON
 * (you can change the logic here if your JSON follows a different format
 * than specified above.)
 */
function getRandomQuote(quotesJSON) {
  const keys = Object.keys(quotesJSON);
  const randKey = Math.floor(Math.random() * keys.length);
  const randCategory = keys[randKey];

  var category = quotesJSON[randCategory];
  var quote = category[Math.floor(Math.random() * (Object.keys(category).length + 1))];

  return quote;
}

postTweet();

// tweets every 50*12 minutes (so ~every 12 hrs)
setInterval(postTweet(), 3000000*12);
