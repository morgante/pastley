// we need mongoose
var mongoose = require('mongoose')
		, _ = require('../public/lib/underscore')
	
var pasteSchema = mongoose.Schema({
	"content": String,
	"created": { type: Date, default: Date.now },
	"period": Number, // in minutes
	"password": String,
	"type": String,
	"accessed": { type: Boolean, default: false}
});

pasteSchema.virtual('expiration').get(function () {
	if( this.period != null )
	{
		return new Date( this.created.getTime() + this.period * 60 * 1000 );
	}
	else
	{
		return new Date('2100-01-01');
	}
});

pasteSchema.methods.hasExpired = function() {
	
	now = new Date();
	
	if( now > this.expiration )
	{
		return true;
	}
	else
	{
		return false;
	}
}

// this.setTime(this.getTime() + (h*60*60*1000));

var Paste = module.exports = mongoose.model('Paste', pasteSchema);