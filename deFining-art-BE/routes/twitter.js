import express from 'express';

const twitterRouter = express.Router();

twitterRouter.post('/getTweetsForDate', (req, res) => {
    if(!req || !req.date){
        throw new Error('Invalid Request');
    }
    res.send(responseObject);
});

export default twitterRouter;