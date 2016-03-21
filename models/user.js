var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {
		type: String,
		default: null
	},
	picture: String,
	username: String,
	provider: String,
	facebook: Object
}, {
	versionKey: false
});

var User = mongoose.model('User', userSchema);

module.exports = User;