
// **** DEFINING ROUTES ****

var   route_index
    , mod_upload = require('./upload')
    , mod_show = require('./show')
    , mod_serve = require('./serve')
    , mod_err404 = require('./err404');


route_index = function(req, res){

        res.render('index', { title: 'Multipart Form example' })
};


// **** EXPORTING ROUTES ****

exports.index = route_index;

exports.upload = mod_upload.route_upload;

exports.show = mod_show.route_show;

exports.serve = mod_serve.route_serve;

exports.err404 = mod_err404.route_err404;
