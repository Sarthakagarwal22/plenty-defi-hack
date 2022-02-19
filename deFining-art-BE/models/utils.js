import mongoose from 'mongoose';

const utilModel = mongoose.model('configs', mongoose.Schema({
        lastModified: Date,
        metaData: {}
    })
);

export default utilModel;