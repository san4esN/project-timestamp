// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get("/api/:date?",function(req,res){
  const dateParam = req.params.date;
  let reqDate;
  if(typeof(dateParam) === "undefined"){
    reqDate = new Date(Date.now());
  }
  else{
    const check = new RegExp(/[^\d]/).test(dateParam);
    if(check)
    {
      reqDate = new Date(dateParam);
    }
    else
    {
      reqDate = new Date(parseInt(dateParam))
    }
  }
  if(reqDate instanceof Date && !isNaN(reqDate)){ //checks if reqDate is a Date object and try to cast it to a number(timestamp) isNan can be replaced with isFinite. 
    res.json({"unix":reqDate.getTime(), "utc":reqDate.toUTCString()})
  }
  else{
    res.json({"error": "Invalid Date"})
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
