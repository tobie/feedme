var jerk = require("jerk");
var fs = require("fs");
var OPTIONS = JSON.parse(fs.readFileSync("./options.json"));
var QUOTES =  {
  manger: JSON.parse(fs.readFileSync("./quotes.json")),
  nutella: JSON.parse(fs.readFileSync("./nutella.json"))
};
var INTERVAL = 60 * 1000; // one minute
var waiting = false;

function randomQuote(type) {
   var q = QUOTES[type],
       i = Math.floor(Math.random() * q.length);
   return q[i];
}

jerk(function(j) {
  j.watch_for(/manger/i, function(message) {
    if (!waiting) {
      waiting = true;
      setTimeout(function() { waiting = false; }, INTERVAL);
      message.say(randomQuote('manger'));
    }
  });
  
  j.watch_for(/nutella/i, function(message) {
      message.say(randomQuote('nutella'));
  });
  
  j.watch_for(/festin/i, function(message) {
      message.say("Un cri jailli du cœur de l’artiste retentit dans le monde entier, donnez-moi une chance de me surpasser.");
  });
}).connect(OPTIONS);


