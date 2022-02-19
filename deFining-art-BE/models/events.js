// import {eventsDB} from '../db/moongoose.js';
import mongoose from 'mongoose';

const eventsModel = mongoose.model('events', mongoose.Schema({
    date: String,
    category: String
}));

export default eventsModel;