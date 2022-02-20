import express from 'express';

const healthRouter = express.Router();

healthRouter.get('/', (req, res) => {
    let responseObject = {
        status: 'OK',
        message: "Server is up and running"
    }
    res.send(responseObject);
});

export default healthRouter;