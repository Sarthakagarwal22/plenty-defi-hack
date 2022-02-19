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

imagesRouter.post('/getGenerateImages', async (req, res, next) => {
    if(!(req && req.body)){
        next(new Error('Invalid request'));
    };
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

export default imagesRouter;