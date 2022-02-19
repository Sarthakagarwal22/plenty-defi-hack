import { twitterDB } from "../db/moongoose";

const twitterModel = twitterDB.model('tweets', {
    date: String,
    tweets:[]
})