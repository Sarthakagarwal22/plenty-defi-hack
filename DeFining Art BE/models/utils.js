import {utilDB} from '../db/moongoose.js';

const utilModel = utilDB.model('configs', {
    metaData: {}
})

export default utilModel;