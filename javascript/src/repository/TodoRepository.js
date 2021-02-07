const Todo = require('../model/Todo');

const TodoRepository = function (connection) {
    this.connection = connection;
}

TodoRepository.prototype.getAll = function () {
    const sql = 'select * from todos';
    // 処理が問題なく完了すればresolve
    // 反対に問題があればrejectを呼び出す
    return new Promise((resolve, reject) => {
        this.connection.query(sql, (err, results) => {
            if (err) return reject(err.mesage);
            const todos = results.map((todo) => new Todo(todo.id, todo.title, todo.description));
            return resolve(todos);
        });
    })
}

TodoRepository.prototype.get = function (id) {
    const sql = 'select * from todos where ?';
    return new Promise((resolve, reject) => {
        this.connection.query(sql, { id: id }, (err, results) => {
            // sql自体のエラーメッセージ
            if (err) return reject(err.mesage);
            // 1件以外の場合はエラー
            if (results.length !== 1) return reject('not data');

            const todos = new Todo(results[0].id, results[0].title, results[0].description);
            return resolve(todos);
        });
    })
}

TodoRepository.prototype.create = function (todo) {
    const sql = 'insert into todos set ?';
    delete todo.id;
    return new Promise((resolve, reject) => {
        this.connection.query(sql, todo, (err, result) => {
            return err ? reject(err.mesage) : resolve(result.insertId);
        });
    })
}

TodoRepository.prototype.update = function (todo) {
    const sql = 'update todos set ? where ?';
    const id = todo.id
    delete todo.id;
    return new Promise((resolve, reject) => {
        this.connection.query(sql, [todo, { id: id }], (err, result) => {
            return err ? reject(err.mesage) : resolve(result);
        });
    })
}

TodoRepository.prototype.delete = function (id) {
    const sql = 'delete from todos where ?';
    return new Promise((resolve, reject) => {
        this.connection.query(sql, { id: id }, (err, result) => {
            return err ? reject(err.mesage) : resolve(result);
        });
    })
}

module.exports = TodoRepository;