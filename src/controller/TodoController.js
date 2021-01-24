const Router = require('express');
const Todo = require('../model/Todo');

const TodoController = function (todoService) {
    this.todoService = todoService;
    this.router = Router();

    const todoUrl = '/';

    this.router.get(todoUrl, async (req, res) => {
        const results = await this.todoService.getAll().catch((err) => {
            res.status(500).send(err);
            return;
        });
        res.status(200).json(results);
    });

    this.router.get(todoUrl + ':id', async (req, res) => {
        const results = await this.todoService.get(req.params.id).catch((err) => {
            res.status(500).send(err);
            return;
        });
        res.status(200).json(results);
    });

    this.router.post(todoUrl, async (req, res) => {
        const todo = new Todo(0, req.body.title, req.body.description);
        const results = await this.todoService.create(todo).catch((err) => {
            res.status(400).send(err);
            return;
        });
        res.status(201).json(results);
    });

    this.router.put(todoUrl + ':id', async (req, res) => {
        const todo = new Todo(parseInt(req.params.id), req.body.title, req.body.description);
        await this.todoService.update(todo).catch((err) => {
            res.status(400).send(err);
            return;
        });
        res.status(200).json(todo);
    });

    this.router.delete(todoUrl + ':id', async (req, res) => {
        await this.todoService.delete(req.params.id).catch((err) => {
            res.status(500).send(err);
            return;
        });
        res.status(204).send();
    });
}

module.exports = TodoController;