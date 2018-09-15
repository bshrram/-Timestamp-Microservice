// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?",function(req,res){
  console.log(req.params.date_string);
  if (req.params.date_string == null)
    res.json({"unix": new Date().getTime(), "utc" : new Date().toUTCString()})
  
  else if (new Date(req.params.date_string) == "Invalid Date")
  {
    var m = Number(req.params.date_string);
    if (new Date(m) == "Invalid Date")
    {
      res.json({"unix": null, "utc" : "Invalid Date" });
    }
    else
    {
      res.json({"unix": new Date(m).getTime(), "utc" : new Date(m).toUTCString()})
    }
  }
  else
    res.json({"unix": new Date(req.params.date_string).getTime(), "utc" : new Date(req.params.date_string).toUTCString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});