var mongoose = require('mongoose');//uvozimo paket mongoose za rad sa mongoDB bazom
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');//povezivanje sa bazom

module.exports = {
  mongoose: mongoose	
};

