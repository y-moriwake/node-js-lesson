import { Todo } from "../../model/Todo";
import { TodoRepository } from '../TodoRepository'
import { Connection } from 'mysql';

export class TodoRepositoryImpl implements TodoRepository {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    getAll(): Promise<Todo[]> {
        const sql = 'select * from todos';
        return new Promise<Todo[]>((resolve, reject) => {
            this.connection.query(sql, (err, results: Todo[]) => {
                const todos = results.map((todo: Todo) => {
                    return {
                        id: todo.id,
                        title: todo.title,
                        description: todo.description
                    } as Todo;
                });
                return err ? reject() : resolve(todos);
            });
        })
    }

    get(id: number): Promise<Todo> {
        const sql = 'select * from todos where ?';
        return new Promise<Todo>((resolve, reject) => {
            this.connection.query(sql, { id: id }, (err, results) => {
                if (err) throw err;
                const todos = results.map((todo: Todo) => {
                    return {
                        id: todo.id,
                        title: todo.title,
                        description: todo.description
                    } as Todo;
                });
                return err ? reject() : resolve(todos[0]);
            });
        })
    }

    create(todo: Todo): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const sql = 'insert into todos set ?';
            this.connection.query(sql, todo, (err, result) => {
                return err ? reject() : resolve(result.insertId as string);
            });
        })
    }

    update(id: number, todo: Todo): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const sql = 'update todos set ? where ?';
            this.connection.query(sql, [todo, { id: id }], (err) => {
                return err ? reject() : resolve('');
            });
        })
    }

    delete(id: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const sql = 'delete from todos where ?';
            this.connection.query(sql, { id: id }, (err) => {
                if (err) throw err;
                return err ? reject() : resolve('');
            });
        })
    }
}