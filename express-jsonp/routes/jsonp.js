exports.route_jsonp = function(req, res){

        res.json({ name: 'Jorge', surname:'Couchet' });

	/*
           //The above is equivalent to the following:
	   res.contentType('application/json');
           res.send({ name: 'Jorge', surname:'Couchet' });
           res.end();
	*/
};
