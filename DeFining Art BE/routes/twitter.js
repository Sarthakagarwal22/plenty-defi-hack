import express from 'express';

const twitterRouter = express.Router();

twitterRouter.get('/getTweets', (req, res) => {
    let responseObject = {
        status: 'OK',
        message: "Server is up and running"
    }
    res.send(responseObject);
});

export default twitterRouter;