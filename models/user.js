var mongoose = require('mogoose')
var Schema   = mongoose.Schema
var bcrypt	 = require('bcrpt-nodejs')


//create user model schema
var UserSchema = new Schema({
	name: String,
	email: String,
	password: String,
	experience: String,
	points: Number,
	level: String,
	gyms: [],
	followers: [],
	following: []
})

UserSchema.pre('save',function(next){
	var user = this

	if (!user.isModified('password')) return next()

	bcrypt.hash(user.password,null,null, function(err,hash){
		if(err) return next(err)

		user.password = hash
		next()
	})
})

UserSchema.methods.comparePassword = function(password){
	var user = this

	return bcrypt.compareSync(password,user.password)
}

module.exports = mongoose.model('User', UserSchema)
