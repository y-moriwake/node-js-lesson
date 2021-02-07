const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const Todo = require('./model/Todo');
const TodoRepository = require('./repository/TodoRepository');
const TodoService = require('./service/TodoService');
const TodoController = require('./controller/TodoController');


////#region サーバ設定

////#region Mysql接続設定

// mysql接続設定

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'user',
    password: 'password',
    database: 'sample_database'
})

connection.connect((err) => {
    if (err) throw err;
    console.log('connected mysql')
});

////#endregion

const todo = new Todo(1, 'test title', 'test descriotion');
console.log(todo);

// サーバー設定
const server = app.listen(4000, () => {
    console.log('Node.js is listening to PORT:' + server.address().port);
});

// expressの設定
app.disabled('x-powered-by');
app.use(cors()).use(bodyParser.json());

////#endregion

const todoRepository = new TodoRepository(connection);
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);
const todoUrl = '/api/todos'

// todoCOntrollerのルーティングを利用する
app.use(todoUrl, todoController.router);
