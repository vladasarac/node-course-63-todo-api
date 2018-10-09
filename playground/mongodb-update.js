const {MongoClient, ObjectID} = require('mongodb');

//conecting to TodoApp database and deleting rows  
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){ return console.log('Unable to connect to MongoDB server'); }
  console.log('Connected to MongoDB server');
  //update collection-a koristeci findOneAndUpdate()
  // db.collection('Todos').findOneAndUpdate({_id: new ObjectID("5bbb5e3a6df8ef4a457ba325")},{$set:{completed: true}},{returnOriginal: false})
  // .then((result) => {
  //   console.log(result);
  // });
  //update, menja se kolona name i daje nova vrednost sa $set a koloni age se radi povecavanje vrednosti za 1 sa $inc
  db.collection('Users')
  .findOneAndUpdate({_id: new ObjectID("5bbb3290e3548110ec6b79a8")},{$set:{name: 'Milojica'},$inc:{age: 1}},{returnOriginal: false})
  .then((result) => {
    console.log(result);
  });

  //close the connection
  // db.close();
});







