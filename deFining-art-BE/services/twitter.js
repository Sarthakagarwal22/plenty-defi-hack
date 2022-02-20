import twitterModel from '../models/tweets.js'
import axios from 'axios';
import dotenv from 'dotenv';
import _ from 'lodash';
import {format} from 'date-fns';

dotenv.config();

let twitterURL = "https://api.twitter.com/2/tweets/search/recent";

export const getTweetsFromCategory = async (category) => {
    if(!category){
        throw new Error('Invalid Request');
    }
    return await twitterModel.findOne({category: category});
}

export const getTweetsFromCategoryAPI = async (category) => {
    
    let prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    prevDate.setUTCHours(23, 59, 59, 999);
    
    category = '#' + category.replace(" ", "").toLowerCase() + " lang:en -is:retweet -is:quote -is:reply";
    let response = [];
    let apiOptions = {
        headers: {
            "Authorization": 'Bearer ' + process.env.TWITTER_BEARER_TOKEN
        }, 
        params: {
            "query": category,
            "tweet.fields": "created_at,possibly_sensitive",
            "max_results": 10,
            "end_time": prevDate.toISOString()
        }
    }
    try {
        const twitterResponse = await axios.get(twitterURL, apiOptions);
        let twitterResponseArr = _.get(twitterResponse, "data.data");
        for (const value of twitterResponseArr) {
            const tweetText = _.get(value, "text");
            response.push(tweetText);
        }
    } catch(err) {
        throw new Error("Error while calling twitter API: " + err);
    }
    return response;
}