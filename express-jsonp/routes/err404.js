
exports.route_err404 = function(req, res){

        res.render('err404', {locals: {title: ' JSONP example'}, status: 404})
};
