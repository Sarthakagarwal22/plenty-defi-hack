import express from 'express';
import {getImagesFromDb} from './services/images.js'

let imagesRouter = express.Router();

imagesRouter.get('/images', (req, res) => {

})