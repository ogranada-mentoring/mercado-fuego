
const { Router } = require('express');
const { getModel } = require('../database');

function createSongRouter(params) {
    const router = new Router();

    router.get('/songs/', async (req, resp) => {
        try {
            const data = await getModel('Song').findAll();
            resp.status(200).send(data);
        } catch (error) {
            resp.status(500).send({message: error.message});
        }
    });

    router.get('/songs/:id', async (req, resp) => {
        try {
            const Album = getModel('Album');
            const data = await getModel('Song').findOne({
                where: {
                    id: req.params.id
                },
                include: [Album]
            });
            if (data) {
                resp.status(200).send(data);
            } else {
                resp.status(404).send(`Song with ID ${req.params.id} does not exists.`);
            }
        } catch (error) {
            resp.status(500).send({message: error.message});
        }
    });
    router.post('/songs/', async (req, resp) => {
        const Band = getModel('Song');
        const data = new Band(req.body);
        const saved = await data.save()
        resp.status(201).send(saved);
    });
    router.put('/songs/', (req, resp) => {
        // TODO: load bands info here
    });
    router.delete('/songs/', (req, resp) => {
        // TODO: load bands info here
    });
    return router;
}

module.exports = {
    createSongRouter
}
