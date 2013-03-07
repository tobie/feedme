var jerk = require("jerk");
var fs = require("fs");
var OPTIONS = JSON.parse(fs.readFileSync("./options.json"));
var QUOTES =  JSON.parse(fs.readFileSync("./quotes.json"));
var INTERVAL = 60 * 1000; // one minute
var waiting = false;

function randomQuote() {
   var i = Math.floor(Math.random() * QUOTES.length);
   return QUOTES[i];
}

jerk(function(j) {
  j.watch_for(/manger/i, function(message) {
    if (!waiting) {
      waiting = true;
      setTimeout(function() { waiting = false; }, INTERVAL);
      message.say(randomQuote());
    }
  });
}).connect(OPTIONS);


