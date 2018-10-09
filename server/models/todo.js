var mongoose = require('mongoose');//uvozimo paket mongoose za rad sa mongoDB bazom
//model za collection Todo
var Todo = mongoose.model('Todo', {
  text: {
  	type: String,
  	required: true,
  	minlength: 1,
  	trim: true
  },
  completed: {
  	type: Boolean,
  	default: false
  },
  completed_at: {
  	type: Number,
  	default: null
  }	
});

module.exports = {Todo: Todo};
