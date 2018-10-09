const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');//uvozimo app variablu iz server foldera
const {Todo} = require('./../models/todo');//uvozimo model Todo iz server/models/todo.js

beforeEach((done) => {
  Todo.remove({}).then(() => {
  	done();
  });
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
      	Todo.find().then((todos) => {
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
  	  	  expect(todos.length).toBe(0);	
  	  	  done();
  	  	}).catch((e) => done(e));
  	  });
  });	
});

