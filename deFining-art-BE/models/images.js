import { imagesDB } from "../db/moongoose.js";

const imagesModel = imagesDB.model('images', {
    date: String,
    imgSrc: String,
    text: String
});

export default imagesModel;