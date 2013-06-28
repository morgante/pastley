$(document).ready( function() {
	_.templateSettings = {
	  interpolate : /\{\{(.+?)\}\}/g
	};
	
	console.log( 'app ready to go' );
	
	$('#prompt .content').html( _.template($('#template-create').html(), {}) );
	
	
	$('#start').click( function() {
		$('#prompt').slideUp();
		$('#loading').slideDown();
		
		return false;
	});
	
	
	// paste create
	$('#paste-create').submit( function( evt, el ) {
		content = $(this).find('textarea').val();
		period = $(this).find('#period').val();
		type = $(this).find('#type').val();
		
		if( period == null )
		{
			alert( 'Please select a time period for your paste to persist for.');
		}
		else
		{
			$.post(
				'/create',
				{
					content: content,
					period: period,
					type: type
				},
				function( data ) {
					window.location = '/paste/' + data._id;
					console.log( data._id );
					
				}
			)
		}
		
		// console.log( content );
		return false;
	});
	
	$(".type-php pre").snippet("php");
});