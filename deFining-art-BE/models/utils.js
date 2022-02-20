import {utilDB} from '../db/moongoose.js';
import mongoose from 'mongoose';

const utilModel = utilDB.model('configs', mongoose.Schema({
    lastModified: Date,
    metaData: {}
})
);

export default utilModel;