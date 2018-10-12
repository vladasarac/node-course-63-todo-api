const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');//uvozimo app variablu iz server foldera
const {Todo} = require('./../models/todo');//uvozimo model Todo iz server/models/todo.js

const todos = [{
  _id: new ObjectID(), 
  text: 'First test todo'
},{
  _id: new ObjectID(), 
  text: 'Second test todo'	
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
  	return Todo.insertMany(todos);
  }).then(() => done());
});

//testiranje rute POST /todos za upis novog todo-a u collecion todos
describe('POST /todos', () => {
  //ako je dobar request, treba da kreira novi todo i vrati status 200	
  it('should create new todo', (done) => {
    var text = 'test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
      	expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
      	if(err){
      	  return done(err);	
      	}
      	Todo.find({text}).then((todos) => {
      	  expect(todos.length).toBe(1);
      	  expect(todos[0].text).toBe(text);	
      	  done()
      	}).catch((e) => done(e));
      });
  });
  //ako je los tj prazan request treba da vrati status 400
  it('should not create todo with invalid body data', (done) => {
  	request(app)
  	  .post('/todos')
  	  .send({})
  	  .expect(400)
  	  .end((err, res) => {
  	  	if(err){
  	  	  return done(err);	
  	  	}
  	  	Todo.find().then((todos) => {
  	  	  expect(todos.length).toBe(2);	
  	  	  done();
  	  	}).catch((e) => done(e));
  	  });
  });	
});

//testiranje rute GET /todos koja vadi sve todo-e iz todos kolekcije
describe('GET /todos', () => {
  it('should get all todos', (done) => {
  	request(app)
  	  .get('/todos')
  	  .expect(200)
  	  .expect((res) => {
  	  	expect(res.body.todos.length).toBe(2);
  	  })
  	  .end(done);
  });
});

//testiranje rute Get/todos/:id koja vadi pojedinacni todo iz todos kolekcije
describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
  it('should return 404 for non-objects ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

//testiranje rute DELETE/todos/:id koja pronalazi pojedinacni todo iz todos kolekcije i brise ga
describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }
        Todo.findById(hexId)
          .then((todo) => {
            expect(todo).toNotExist();
            done();
          })
          .catch((e) => done(e)); 
      });
  });
  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});






