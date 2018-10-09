var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');//uvozimo mongoose variablu iz fajla db/mongoose.js tj vez sa bazom
var {Todo} = require('./models/todo');//uvozimo model Todo u variablu Todo iz fajla /models/todo.js
var {User} = require('./models/user');//uvozimo model User u variablu User iz fajla /models/user.js
 
var app = express();

//
app.use(bodyParser.json());

//pravljenje novog todo-a kad stigne request iz postmana
app.post('/todos', (req, res) => {
  console.log(req.body);
  //pozivamo Todo (model)
  var todo = new Todo({
    text: req.body.text
  });
  //cuvamo u bazi novi todo
  todo.save()
    .then((doc) => {
      //ako se upise novi red u bazu
      res.send(doc);
    }, (e) => {
      //ako baza vrati error tj ne uspe upis
      res.status(400).send(e);
    });
});


//start the server
app.listen(3000, () => {
  console.log('Started on port 3000');
});

//izvozimo app zbog testiranja
module.exports = {app};








