var express = require('express'),
    index = require('./routes'),
    path = require('path'),
    autocomplete = require('autocomplete');

var app = express.createServer(express.logger());

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', index.page);
app.get('/airports', index.airports);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});