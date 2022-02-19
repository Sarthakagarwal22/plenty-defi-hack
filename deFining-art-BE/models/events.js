import mongoose from 'mongoose';
import {eventsDB} from '../db/moongoose.js';

const eventsModel = eventsDB.model('events', mongoose.Schema({
    date: String,
    category: String
})
)

export default eventsModel;