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

export const setImageInDb = async (date, imageData) => {
    if(!(date && imageData)){
        throw new Error('Invalid reqeust');
    }
    
    const imageArray = await getImagesFromDb(date);
    if(imageArray.length === 10){ 
        throw new Error('Image array is full');
    }
    imageArray.push(imageData);
    const dbUpdateObj = {
        date,
        imagesArray: imageArray
    }
    await imagesModel.findOneAndUpdate({date: date}, dbUpdateObj, {upsert: true});
}

