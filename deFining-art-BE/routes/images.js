import express from 'express';
import {getImagesFromDb, setImageInDb, getAIGeneratedImageDetails} from '../services/images.js'

const imagesRouter = express.Router();

imagesRouter.post('/getByDate', async (req, res, next) => {
    if(!(req && req.body)){
        next(new Error('Invalid request'));
    }
    try{
    const imagesArray = await getImagesFromDb(req.body.date);
    res.status(200).send(imagesArray);
    }catch(e){
        next(e);
    }
})

imagesRouter.post('/setondate', async (req, res, next) => {
    if(!(req && req.body)){
        next(new Error('Invalid request'));
    }
    try{
        await setImageInDb(req.body.date, req.body.imageData);
        res.status(200).send({
            status: "OK",
            message: "Image updated successfully"
        });
    }catch(e){
        next(e);
    }
})

imagesRouter.post('/getGeneratedImages', async (req, res, next) => {
    if(!(req && req.body)){
        next(new Error('Invalid request'));
    };
    let date = req.body.date;
    date = getPrevDay(date);
    let aiGenerateImageDetails;
    try {
        aiGenerateImageDetails = await getAIGeneratedImageDetails(req.body.date);
    } catch (e) {
        next(e);
    }
    res.status(200).send({
        status: "OK",
        message: "Image fetched successfully",
        imageDetails: aiGenerateImageDetails
    });
    
})

const getPrevDay = (currDay) => {
    let dateVars = currDay.split("-");
    let day = parseInt(dateVars[1]);
    let month = parseInt(dateVars[0]);
    if (day == 1 && month == 1) {
        return "12-31";
    }
    else if (day > 1) {
        return String(dateVars[0]) + "-" + String(dateVars[1]-1);
    } else {
        return String(dateVars[0]-1) + "-" + String(dateVars[1]);
    }
}

export default imagesRouter;