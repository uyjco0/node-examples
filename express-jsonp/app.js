
// **** MODULE DEPENDENCIES ****

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();



// **** CONFIGURATION ****

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  //The 'static' middleware should be before of the 'router' middleware, otherwise
  //the "*" route (used to provide a custom 404 message), matchs the .js and .css files. 
  app.use(express.static(__dirname + '/public')); 

  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.logger({ format: ':method :url' }));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.enable("jsonp callback");

app.error(function(err, req, res, next){

	res.render('err500', { locals: { error: err, title: 'JSONP example' }, status: 500 });
});



// **** ROUTES ****

app.get('/', routes.index);

app.get('/jsonp', routes.jsonp);

//The '*' route (used to provide a custom 404 message), must go at the END of the routes list !!
app.get('*', routes.err404);



// **** SERVER PORT ****

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
