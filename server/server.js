require('./config/config.js');//fajl u kom je konfiguracija enviroment variabli
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');//uvzimo ObjectID, da bi mogli da radimo validaciju pristiglog id-a

var {mongoose} = require('./db/mongoose.js');//uvozimo mongoose variablu iz fajla db/mongoose.js tj vez sa bazom
var {Todo} = require('./models/todo');//uvozimo model Todo u variablu Todo iz fajla /models/todo.js
var {User} = require('./models/user');//uvozimo model User u variablu User iz fajla /models/user.js
var {authenticate} = require('./middleware/authenticate');//uvozimo middleware authenticate
 
var app = express();
const port = process.env.PORT;

//
app.use(bodyParser.json());

//-------------------------------------------------------------------------------------------------------------------------------------------------
// Todo Rute
//-------------------------------------------------------------------------------------------------------------------------------------------------

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

//-------------------------------------------------------------------------------------------------------------------------------------------------

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

//-------------------------------------------------------------------------------------------------------------------------------------------------

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

//-------------------------------------------------------------------------------------------------------------------------------------------------

//brisanje todo-a po id-u
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;//uzimamo pristigli id iz URL-a
  if(!ObjectID.isValid(id)){//validacija id(proverava da li je pristigli id validan MongoDB id)
    return res.status(404).send();//ako id nije validan saljemo 404
  }
  Todo.findByIdAndRemove(id)
    .then((todo) => {
      if(!todo){//ako nema reda u bazi sa tim id-em
       return res.status(404).send();
      }
      res.send({todo});//ako nadjemo todo u bazi i obrisemo ga saljemo ga klijentu
    })
    .catch((e) => {
      res.status(400).send();
    });
});

//-------------------------------------------------------------------------------------------------------------------------------------------------

//PATCH ruta za upate todo-a
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;//uzimamo pristigli id iz URL-a
  //koristeci lodash-ov pick  metod od req objekta pravimo objekat body koji ima samo propertye text i completed, posto samo to user moze da updateuje
  var body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectID.isValid(id)){//validacija id(proverava da li je pristigli id validan MongoDB id)
    return res.status(404).send();//ako id nije validan saljemo 404
  }
  //ako ima u body-u completed element i ako je boolean(tj user je komepkletirao todo)
  if(_.isBoolean(body.completed) && body.completed){
    body.completed_at = new Date().getTime();//pravimo kompletedAt kolonu i u njoj trenutno vreme
    console.log('body', body);
  }else{//ako nije stigao body.completed pravimo kolonu completed i vrednost false i kolonu completedAt i vrednos null
    body.completed = false;
    body.completed_at = null;
  }
  //updateujemo todo collection po id koloni, argument new: true, znaci da hocemo da nam funkcija vrati novi updateovani todo
  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then((todo) => {
      if(!todo){//ako ne nadje todo za update po stiglom id-u 
        return res.status(404).send();
      }
      res.send({todo});//ako uradi update
    })
    .catch((e) => {//ako je neki error
      res.status(404).send();
    });
});

//-------------------------------------------------------------------------------------------------------------------------------------------------
// User Rute
//-------------------------------------------------------------------------------------------------------------------------------------------------

//ruta za pravljenje novog usera
app.post('/users', (req, res) => {
  //koristeci lodash-ov pick  metod od req objekta pravimo objekat body koji ima samo propertye email i password
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);//pravimo novog usera, tj instancu modela User i dajemo mu body kao argument da popuni kolone email i password
  //cuvamo u bazi
  user.save()
    .then(() => {
      return user.generateAuthToken();//pozivamo metod generateAuthToken() user modela da napravi token
      // res.send(user);
    })
    .then((token) => {
      res.header('x-auth', token).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

//-------------------------------------------------------------------------------------------------------------------------------------------------

//ruta vadi trenutno ulogovanog usera(valjda, tako nesto....)
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});  

//-------------------------------------------------------------------------------------------------------------------------------------------------

//start the server
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

//-------------------------------------------------------------------------------------------------------------------------------------------------

//izvozimo app zbog testiranja
module.exports = {app};

//-------------------------------------------------------------------------------------------------------------------------------------------------







