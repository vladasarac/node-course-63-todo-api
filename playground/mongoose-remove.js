const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');//uvozimo mongoose variablu iz fajla /server/db/mongoose.js tj vezu sa bazom
const {Todo} = require('./../server/models/todo');//uvozimo model Todo u variablu Todo iz fajla server/models/todo.js
const {User} = require('./../server/models/user');//uvozimo model Todo u variablu Todo iz fajla server/models/todo.js

//Todo.remove, brisanje svih todo-a
// Todo.remove({}).then((res) => {
//   console.log(res);
// });

//naci jedan todo i obrisati ga
Todo.findOneAndRemove({_id: '5bc0781f42d8497aab1617ea'}).then((todo) => {
  console.log(todo);
});

//naci jedan todo po id-u i obrisati ga
// Todo.findByIdAndRemove('5bc0780e42d8497aab1617dd').then((todo) => {
//   console.log(todo);
// });


