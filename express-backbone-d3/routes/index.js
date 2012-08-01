
// **** DEFINING ROUTES ****

var   route_index
    , mod_err404 = require('./err404');


route_index = function(req, res){

        res.render('index', { title: 'Backbone example' })
};


// **** EXPORTING ROUTES ****

exports.index = route_index;

exports.err404 = mod_err404.route_err404;
