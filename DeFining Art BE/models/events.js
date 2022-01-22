import {eventsDB} from '../db/moongoose.js';

const eventsModel = eventsDB.model('events', {
    date: String,
    category: String
});

export default eventsModel;