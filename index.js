var jerk = require("jerk");
var fs = require("fs");
var OPTIONS = getJSON("./options.json");
var QUOTES =  {
  manger: getJSON("./quotes.json"),
  nutella: getJSON("./nutella.json")
};

var INTERVAL = 60 * 1000; // one minute
var waiting = false;

function getJSON(fileName) {
  return JSON.parse(fs.readFileSync(fileName));
}

function randomQuote(type) {
   var q = QUOTES[type],
       i = Math.floor(Math.random() * q.length);
   return q[i];
}

jerk(function(j) {
  j.watch_for(/manger|boire|grailler|bouffer|déjeuner|dejeuner|diner|mang3r|m4nger|m4ng3r|m@anger|m@ng3r|repas|nourriture/i, function(message) {
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
  
  j.watch_for(/au revoir,? babette/i, function(message) {
      message.say("Au revoir.");
      process.exit();
  });
}).connect(OPTIONS);


