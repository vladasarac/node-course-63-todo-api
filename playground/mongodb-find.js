const {MongoClient, ObjectID} = require('mongodb');

//conecting to TodoApp database and fetching rows into 
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){ return console.log('Unable to connect to MongoDB server'); }
  console.log('Connected to MongoDB server');
  //querying Todos collection
  // db.collection('Todos').find({ completed: false }).toArray().then((docs) => {
  //query preko kolone _id, mora se napraviti ObjectID()
  // db.collection('Todos').find({ _id: new ObjectID('5bbb31187ba34644d8f935a8') }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos.', err);
  // });
  //COUNT query
  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos.', err);
  // });
  //fetching data from users collection
  db.collection('Users').find({name: "Mile"}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch users.', err);
  });
  //
  // db.collection('Users').find({name: "Mile"}).toArray((err, docs) => {
  //   if (err) throw err;
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }); 
  //close the connection
  // db.close();
});




