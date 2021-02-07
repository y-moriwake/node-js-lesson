import express, { Request, Response, NextFunction } from 'express';
import mysql from 'mysql';
import { AddressInfo } from 'net';
import bodyParser from 'body-parser';
import cors from 'cors'
import { Todo } from './model/Todo'
import { TodoRepositoryImpl } from "./repository/impl/TodoRepositoryImpl";
import { TodoServiceImpl } from "./service/impl/TodoServiceImpl";
import { TodoController } from "./controller/TodoController";

const app = express();

//#region expressでWebサーバーの設定

// expressで4000ポートにサーバー起動
const server = app.listen(4000, () => {
  const address = server.address() as AddressInfo;
  console.log("Node.js is listening to PORT:" + address.port);
});

// expressの設定 (cors method header 許可の設定)
app.disable('x-powered-by');
app.use(cors()).use(bodyParser.json());

// cors を使用せず手動で設定すると以下のような感じになる
// app.use((req: Request, res: Response, next:NextFunction ) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization, access_token'
//   );

//   if ('OPTIONS' === req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// });

//#endregion

//#region mysqlに接続

const connection = mysql.createConnection({
  host: '',
  port: 3306,
  user: 'user',
  password: 'password',
  database: 'sample_database',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('connected mysql');
});

//#endregion

// インスタンス生成
const todoRepository = new TodoRepositoryImpl(connection);
const todoService = new TodoServiceImpl(todoRepository);
const todoController = new TodoController(todoService);
app.use('/api/', todoController.router)

//#region APIのエンドポイント(APIに接続するためのURL)を設定

//#endregion
