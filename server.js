var express = require('express');

var app = express();

// Get our port from heroku environment variable process.env.PORT
const PORT = process.env.PORT || 3000;

// Do something with each response
// openWeather API can only handle http so we need to redirect everything to http
// I don't really understand this ^ Why do we need to redirect _everything_ ?
// Why don't we just redirect the openWeather stuff?
app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));

app.listen(PORT, function() {
   console.log('Express Server up and running on port ' + PORT);
 });
