jQuery(function() {

	$('#form-test').submit(function(){

		//Hide the form
		$(this).hide();

		//Show the loading message
		$('#text-test').show();
	
		//Allow the normal submit to continue
		return true;
        });

});
