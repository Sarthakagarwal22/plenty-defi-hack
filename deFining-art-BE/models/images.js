import mongoose from 'mongoose';
import { imagesDB } from "../db/moongoose.js";

const imagesModel = imagesDB.model('images', mongoose.Schema({
    date: String,
    imgSrc: String,
    text: String
})
);

export default imagesModel;