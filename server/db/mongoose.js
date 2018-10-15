var mongoose = require('mongoose');//uvozimo paket mongoose za rad sa mongoDB bazom
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);//povezivanje sa bazom

module.exports = {
  mongoose: mongoose	
};

//

