var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 2020));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname + 'json')));

app.set('views', __dirname + '/app/pages');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(request, response) {
    response.render('index');
});

app.all('/*', function(req, res){
  res.sendFile('index.html', { root: __dirname });
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE", "OPTIONS");
    // next();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
