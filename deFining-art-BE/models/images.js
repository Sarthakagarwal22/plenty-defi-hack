import { imagesDB } from "../db/moongoose.js";

const imagesModel = imagesDB.model('images', {
    date: String,
    imagesArray: Array
});

export default imagesModel;