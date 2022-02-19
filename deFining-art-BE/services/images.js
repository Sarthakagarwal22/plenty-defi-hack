import imagesModel from "../models/images.js";

import {imagesCache} from "../app.js";

export const getImagesFromDb = async (date) => {
    if(!date){
        throw new Error('Invalid reqeust');
    }
    
    const cachedImageArray = imagesCache.get(date);
    if(cachedImageArray){
        return {
            date,
            images: cachedImageArray
        }
    }

    const imagesArrayFromDB = await imagesModel.findOne({date: date});
    if(!(imagesArrayFromDB && imagesArrayFromDB.imagesArray && imagesArrayFromDB.imagesArray.length)){
        return [];
    }
    if(imagesArrayFromDB.imagesArray.length === 10)
        imagesCache.set(date, imagesArrayFromDB.imagesArray);
    return {
        date,
        images: imagesArrayFromDB.imageArray
    }
}

export const setImageInDb = async (date, imageSrc, text) => {
    if(!(date && imageData)){
        throw new Error('Invalid reqeust');
    }
    
    const dbUpdateObj = {
        date,
        imageSrc, text
    }

    const mongoImageId = await imagesModel.create(dbUpdateObj);
    return mongoImageId;
}

