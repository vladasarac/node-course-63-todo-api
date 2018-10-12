var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');//uvzimo ObjectID, da bi mogli da radimo validaciju pristiglog id-a

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

//vadjenje svih todo-a iz baze
app.get('/todos', (req, res) => {
  //vadimo sve iz todos kolekcije
  Todo.find()
    .then((todos) => {
      res.send({todos})  
    }, (e) =>{
      //ako baza vrati error tj ne izvadi nista iz baze
      res.status(400).send(e);
    });
});

//vadjenje jednog todoa
app.get('/todos/:id', (req, res) => {
  //res.send(req.params);
  var id = req.params.id;//uzimamo pristigli id iz URL-a
  if(!ObjectID.isValid(id)){//validacija id(proverava da li je pristigli id validan MongoDB id)
    return res.status(404).send();//ako id nije validan saljemo 404
  }
  Todo.findById(id)
    .then((todo) => {
     if(!todo){//ako nema reda u bazi sa tim id-em
       return res.status(404).send();
     }
      res.send({todo});//akonadjemo todo u bazi saljemo ga klijentu
    })
    .catch((e) => {
      res.status(400).send();
    });
});


//start the server
app.listen(3000, () => {
  console.log('Started on port 3000');
});

//izvozimo app zbog testiranja
module.exports = {app};








