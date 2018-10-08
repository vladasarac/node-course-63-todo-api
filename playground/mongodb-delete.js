const {MongoClient, ObjectID} = require('mongodb');

//conecting to TodoApp database and deleting rows  
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){ return console.log('Unable to connect to MongoDB server'); }
  console.log('Connected to MongoDB server');
  //deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  // 	console.log(result);
  // });
  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  // 	console.log(result);
  // });
  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  // 	console.log(result);
  // });
  //brisanje u Users collection-u
  db.collection('Users').deleteMany({ name: 'Mile' }).then((result) => {
  	console.log('bla');
  });
  db.collection('Users').findOneAndDelete({ _id: new ObjectID("5bbb3d0af453aadbc81490da") }).then((result) => {
  	console.log(result);
  });

  //close the connection
  // db.close();
});







