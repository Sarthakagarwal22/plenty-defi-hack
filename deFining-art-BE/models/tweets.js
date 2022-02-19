import mongoose from 'mongoose';

const twitterModel = mongoose.model('tweets', mongoose.Schema({
        date: String,
        tweets:[]
    })
);

export default twitterModel;
