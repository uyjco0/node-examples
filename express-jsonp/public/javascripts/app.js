jQuery(function() {

	$('#trigger1').click(function(){

		$('#user').text('');
                
		$('#trigger1').text('loading');
                
		//Here I'm getting data from my own server.

                //The the '?' in the 'callback' parameter at the 'getJSON' 's URL parameter is asking to the jQuery 'getJSON' function
                //to automatically generate the name of the 'jsonp callback' function:
                     // i)  Thus jQuery automatically generate for example the 'jQueryXXX' name for the 'jsonp callback' function
                                 // Thus, the server is receiving an 'HTTP GET http://127.0.0.1:3000/jsonp?callback=jQueryXXX'
                     // ii) The server as an answer returns the source code of a javascript script (the code for the jQueryXXX function): 
                                // Source code: " function jQueryXXX () { return {field1:value1, .., fieldn:valuen} } "
                                    // Where at the 'return' of the jQueryXXX function is the JSON object requested: 
                                          // {field1:value1, .. fieldn:valuen}
                    //  iii) When jQuery receives the server answer (the javascript source code with the jQueryXXX definition), it does:
                               // data = jQueryXXX();
                                   // That means that jQuery is loading in the 'data' variable the JSON object requested.
		$.getJSON('http://127.0.0.1:3000/jsonp?callback=?', function(data){
                    
			$('#user').append('<li>'+ data.name + ' ' + data.surname + '</li>');
                    
			$('#trigger1').text('click to load your name!');
                })
        });

	$('#trigger2').click(function(){

                $('#tweets').text('');

                $('#trigger2').text('loading');

		//Here I'm getting data from the Twitter server:
                    // Thus, I'm requesting data from a server in a different domain and resolving the 'same origin policy' through jsonp

		// The 'getJSON' 's second paramenter: '{q:node.js}' are the parameters for the HTTP GET:
                    // Thus, the server is receiving an 'HTTP GET http://search.twitter.com/search.json?callback=jQueryXXX?q=node.js'  
		$.getJSON("http://search.twitter.com/search.json?callback=?",{q:"node.js"},function(data){

			$.each(data.results, function(i,tweet){

				$("#tweets").append("<li>"+tweet.text+"</li>");
			});

                        $('#trigger2').text('click to load tweets!');
                })
        });
});
