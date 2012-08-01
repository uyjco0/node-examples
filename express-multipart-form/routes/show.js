
exports.route_show = function(req, res){

	//Its possible to retrieve the GET parameters from an URL using the field 'query' from the request object ('req'):
          //In this case the URL is: http://show?name=name_val&path=path_val&size=path_size
	var   name = req.query['name']
            , path = req.query['path']
	    , size = req.query['size'];

        res.render('show', {title: ' Multipart Form example', name: name, path: path, size: size})
};
