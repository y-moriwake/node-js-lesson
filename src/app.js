const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// サーバー設定
const server = app.listen(4000, () => {
    console.log('Node.js is listening to PORT:' + server.address().port);
});

app.disabled('x-powered-by');
app.use(bodyParser.json());

const sampleData = [
    {
        id: 0,
        title: 'sampleData1',
        description: 'samnpleData1'
    },
    {
        id: 1,
        title: 'sampleData2',
        description: 'samnpleData2'
    },
];

// getリクエスト
app.get('/', (req, res, next) => {
    res.json(sampleData);
});

// getリクエスト(id指定)
app.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const data = sampleData.find((data) => data.id === id);
    res.json(data);
});

// Postリクエスト
app.post('/', (req, res, next) => {
    const data = req.body;
    console.log(data);
    res.json(data);
});