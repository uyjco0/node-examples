
// **** MODULE DEPENDENCIES ****

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();



// **** CONFIGURATION ****

app.configure(function(){

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  //The 'bodyParser' middleware is internaly using the 'formidable' module, so the parameters are the same:
    //Setting the upload directory (through the 'uploadDir' parameter) for the multipart forms:
      //So, don't forget of creating 'tmp/uploads', otherwise you will receive an error!!
    //Also setting to include the extensions of the original files.
  app.use(express.bodyParser({
	uploadDir: '/tmp/uploads',
        keepExtensions: true
  }));

  app.use(express.methodOverride());

  //The 'static' middleware should be before of the 'router' middleware, otherwise
  //the "*" route (used to provide a custom 404 message), matchs the .js and .css files.
  app.use(express.static(__dirname + '/public'));

  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.logger({ format: ':method :url' })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.error(function(err, req, res, next){
	res.render('err500', { locals: { error: err }, status: 500 });	
});



// **** ROUTES ****

app.get('/', routes.index);

//The '*' route (used to provide a custom 404 message), must go at the END of the routes list !!
app.get('*', routes.err404);



// **** SERVER PORT ****

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
