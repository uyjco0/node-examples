
// **** DEFINING ROUTES ****

var   route_index
    , mod_jsonp = require('./jsonp')
    , mod_err404= require('./err404');


route_index = function(req, res){

        res.render('index', { title: 'JSONP example' })
};


// **** EXPORTING ROUTES ****

exports.index = route_index;

exports.jsonp = mod_jsonp.route_jsonp;

exports.err404 = mod_err404.route_err404;

