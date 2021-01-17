const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

////#region サーバ設定

////#region Mysql接続設定

// mysql接続設定

const connection = mysql.createConnection({
    host:'localhost',
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

// サーバー設定
const server = app.listen(4000, () => {
    console.log('Node.js is listening to PORT:' + server.address().port);
});

// expressの設定
app.disabled('x-powered-by');
app.use(cors()).use(bodyParser.json());

////#endregion

// getリクエスト
app.get('/', (req, res, next) => {
    const sql = 'select * from todos where `id` = 2';
    connection.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results);
    });
});

// getリクエスト(id指定)
app.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const sql = 'select * from todos where ?';
    connection.query(sql, {id: id},(err, results) => {
        if(err) throw err;
        res.json(results[0]);
    });
});

// // Postリクエスト
// app.post('/', (req, res, next) => {
//     const data = req.body;
//     console.log(data);
//     res.json(data);
// });