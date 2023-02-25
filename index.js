const express = require('express');
const bodyParser = require('body-parser');

const { close } = require('./db/mongo');
const { createBook, findAllByTitle } = require('./db/books');

/* Main */ {
    const app = express();

    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use('/books', books());

    const server = app.listen(3000);
    server.on('close', (_) => close()); // close connection with database when the server stopped
}

function books() {
    const router = express.Router();

    router.get('/search', async (req, res) => {
        const { title } = req.query;
        const found = await findAllByTitle(title);
        res.json(found);
    });

    router.post('/', async (req, res) => {
        const { title, price } = req.body || {};
        if (!title || !price) {
            res.sendStatus(400);
        } else {
            const created = await createBook({ title, price });
            res.json(created);
        }
    });

    return router;
}


