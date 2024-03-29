
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer()
, io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

//app.listen(3000);
app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

io.sockets.on('connection', function(socket) {
    socket.on('msg send', function(data) {
        socket.emit('msg push', data);
        socket.broadcast.emit('msg push', data);
    });
});

