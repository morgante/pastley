var Paste = require('../models/paste')
	, pkg = require('../package.json')

exports.index = function( req, res ) {
	
	res.render("index", {
		project: pkg.name
	});
}

exports.create = function( req, res ) {
	
	// Math.random().toString(36).slice(-8);
	
	password = Math.random().toString(36).slice(-8);
	
	paste = {
		content: req.body.content,
		password: password,
		type: req.body.type
	}
	
	if( req.body.period != 'forever' )
	{
		paste.period = req.body.period;
	}
		
	Paste.create( paste, function( err, paste ) {
		res.send( paste );
	});
}

exports.get = function( req, res ) {
	
	// res.send( req.params.id );
		
	Paste.findById( req.params.id, function( err, paste ) {
				
		if( paste.hasExpired() )
		{
			res.send( 'paste has expired' );
		}
		else
		{
			
			res.render("paste", {
				project: pkg.name,
				url: req.protocol + "://" + req.get('host') + req.url,
				first: !paste.accessed,
				paste: paste
			});
			
			paste.accessed = true;
			paste.save( function( err, paste ) {
				
			});
		}		
	});

}

exports.destroy = function( req, res ) {
	
	// res.send( req.params.id );
		
	Paste.findById( req.params.id, function( err, paste ) {
				
		paste.remove();		
	});

}