import express from 'express';

import {getMetaData, updateMetaData} from '../services/utils.js';

const utilRouter = express.Router();

utilRouter.get('/getMetaData', async (req, res, next) => {
    try{
        const metaData = await getMetaData();
        res.status(200).send(metaData);
    }catch(err){
        next(err);
    }
})

utilRouter.post('/updateMetaData', async (req, res, next) => {
    if(!req || !req.body){
        throw new Error('Invalid Request');
    }
    try{
        const metaData = await updateMetaData(req.body.updateObj);
        res.status(200).send(metaData);
    }catch(err){
        next(err);
    }
})

export default utilRouter;