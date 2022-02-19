import { twitterDB } from "../db/moongoose.js";

const twitterModel = twitterDB.model('tweets', {
    date: String,
    tweets:[]
})

export default twitterModel;
