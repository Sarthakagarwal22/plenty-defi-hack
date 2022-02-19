import mongoose from 'mongoose';

const imagesModel = mongoose.model('images', mongoose.Schema({
        date: String,
        imgSrc: String,
        text: String
    })
);

export default imagesModel;