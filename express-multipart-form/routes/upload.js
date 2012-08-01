exports.route_upload = function(req, res){

	//The 'bodyParser' middleware fills the 'files' field in the request object (through the 'formidable' module):
          //To see what is inside of 'files' use the function 'inspect' from the module 'util':
            //Do: var util = require('util'); console.log(util.inspect(req.files))
	var file = req.files.upload;

	//The 'redirect' method is sending an 'end' to the client (thus, the client TCP connection is closed).
        //Here I'm generating an URL with GET parameters
	res.redirect('/show?name='+ file.name + '&path=' + file.path + '&size=' + file.size);
};
