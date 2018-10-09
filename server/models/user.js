var mongoose = require('mongoose');//uvozimo paket mongoose za rad sa mongoDB bazom
//model za User collection
var User = mongoose.model('User', {
  email: {
  	type: String,
  	required: true,
  	trim: true,
  	minlength: 1
  }
});

module.exports = {User: User};