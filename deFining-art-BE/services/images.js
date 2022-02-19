import imagesModel from "../models/images.js";
import fs from 'fs';
import { getFilesFromPath } from 'web3.storage'


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
    if(!(date && imageSrc)){
        throw new Error('Invalid reqeust');
    }

    const dbUpdateObj = {
        date,
        imageSrc, text
    }

    const mongoImageId = await imagesModel.create(dbUpdateObj);
    return mongoImageId;
}

export const createImageFromBase64 = async (imageName, base64Str) => {

    await fs.writeFileSync(imageName, base64Str, 'base64');
    const file = await getFilesFromPath(imageName);
    return file;
}

export const getAIGeneratedImageDetails = async (date) => {
    try {
        await imagesModel.find({date: date});
    } catch(e) {
        throw new Error("Error while fetching generated image list: " + e.message);
    }
}