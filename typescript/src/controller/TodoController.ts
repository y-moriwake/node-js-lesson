import { SERVFAIL } from "dns";
import { NextFunction, Request, Response, Router } from "express";
import { TodoServiceImpl } from "../service/impl/TodoServiceImpl";
import { TodoService } from "../service/TodoService";

export class TodoController {

    public router: Router;
    private todoService: TodoService;

    constructor(todoService: TodoService) {
        this.router = Router();
        this.todoService = todoService

        this.router.get("/todos", async (req: Request, res: Response, next: NextFunction) => {
            const todos = await this.todoService.getAll().catch((err) => {
                console.log(err)
                res.status(500).send(err);
                return;
            })
            res.status(200).send(todos);
        });

        this.router.get("/todos/:id", async (req: Request, res: Response, next: NextFunction) => {
            const id = parseInt(req.params.id);
            const todo = await this.todoService.get(id).catch((err) => {
                console.log(err)
                res.status(500).send(err);
                return;
            })
            res.status(200).send(todo);
        });

        this.router.post("/todos/:id", async (req: Request, res: Response, next: NextFunction) => {
            const todo = req.body;
            const insertId = await this.todoService.create(todo).catch((err) => {
                console.log(err)
                res.status(500).send(err);
                return;
            })
            res.status(201).send(insertId);
        });

        this.router.put("/todos/:id", async (req: Request, res: Response, next: NextFunction) => {
            const id = parseInt(req.params.id);
            const todo = req.body;
            const updateId = await this.todoService.update(id, todo).catch((err) => {
                console.log(err)
                res.status(500).send(err);
                return;
            })
            res.status(200).send();
        });

        this.router.delete("/todos/:id", async (req: Request, res: Response, next: NextFunction) => {
            const id = parseInt(req.params.id);
            const todos = await this.todoService.delete(id).catch((err) => {
                console.log(err)
                res.status(500).send(err);
                return;
            })
            res.status(204).send();
        });
    }
}