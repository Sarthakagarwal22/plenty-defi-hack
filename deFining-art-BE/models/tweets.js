import mongoose from 'mongoose';
import { twitterDB } from "../db/moongoose.js";

const twitterModel = twitterDB.model('tweets', mongoose.Schema({
    date: String,
    tweets:[]
})
);

export default twitterModel;
