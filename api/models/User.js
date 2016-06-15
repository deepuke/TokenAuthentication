var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.model('User', {
	username : String,
	email : { type: String, required: true, trim: true },
	password : String,
	address : String,
	zipcode : String,
	companyname: String,
});


exports.model = mongoose.model('User', UserSchema);
/*UserSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password')){
		return next();
	}

	bcrypt.genSalt(10, function(err, salt){
		if(err) return next(err);

		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err) return next(err);

			user.password = hash;
			next();
		});
	});
});*/
