import express from 'express';

import {getCategoryonDate, updateCategoryonDate} from '../services/calendar.js';

const calendarRouter = express.Router();

calendarRouter.post('/getCategory', async (req, res, next) => {
    if(!(req && req.body)){
        next(new Error('Invalid Body'));
    }
    try{
    const category = await getCategoryonDate(req.body.date);
    res.status(200).send(category);
    }catch(err){
        next(err);
    }
});

calendarRouter.post('/updateCategory', async (req, res, next) => {
    if(!(req && req.body)){
        next(new Error('Invalid Body'));
    }
    try{
    await updateCategoryonDate(req.body.date, req.body.category);
    res.status(200).send({
        status: "OK",
        message: "Category updated successfully"
    });
    }catch(err){
        next(err);
    }
});
export default calendarRouter;