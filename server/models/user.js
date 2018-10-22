const  mongoose = require('mongoose');//uvozimo paket mongoose za rad sa mongoDB bazom
const validator = require('validator');//paket validator koji cemo koristiti da verifikujemo da li je email validan
const jwt = require('jsonwebtoken');//paket jesonwebtoken za pravljenje tokena
const _ = require('lodash');//paket lodash
const bcrypt = require('bcryptjs');//paket cryptjs za sifriranje passworda

//model za User collection
var UserSchema = new mongoose.Schema({
  //kolona za email
  email: {
  	type: String,
  	required: true,
  	trim: true,
  	minlength: 1,
  	unique: true,
  	validate: {
  	  validator: validator.isEmail, // pozivamo isEmail metod paketa validator da uradi validaciju emaila(vraca TRUE ili FALSE)
  	  message: '{VALUE} is not a valid email'	
  	}
  },
  //kolona za passsword
  password: {
  	type: String,
  	require: true,
  	minlength: 6
  },
  //kolona za token
  tokens: [{
  	access: {
  	  type: String,
  	  require: true	
  	},
  	token: {
      type: String,
  	  require: true	
  	}
  }]
});

//ovaj metod iz izvucenog usera iz baze koristeci lodashov pick izvlaci samo id i email(da bi token i password ostali skriveni) 
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

//funkcija User modela koja ce kad se pozove praviti token za usera
UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  //metod ign jwt paketa pravi token od _id-a usera, stringa auth tj variable access i salta 'abc123' 
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  user.tokens.push({access, token});//upisujemo token u kolonu tokens u users tabeli(posto je kolona array radimo push)
  return user.save()
    .then(() => {
      return token;	
    });
};

//metod koji nalazi usera po tokenu
UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;
  try{
  	decoded = jwt.verify(token, 'abc123');
  }catch(e){
  	return new Promise((resolve, reject) => {
 	    reject();
  	});
  }
  return User.findOne({ '_id': decoded._id, 'tokens.token': token, 'tokens.access': 'auth' });
};

//mongoose-ov middleware koji se poziva re save-a
UserSchema.pre('save', function(next){
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  }else{
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User: User};