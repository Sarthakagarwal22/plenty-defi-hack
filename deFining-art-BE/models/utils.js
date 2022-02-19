import {utilDB} from '../db/moongoose.js';

const utilModel = utilDB.model('configs', {
    lastModified: Date,
    metaData: {}
})

export default utilModel;