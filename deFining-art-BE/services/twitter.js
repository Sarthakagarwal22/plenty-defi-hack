import twitterModel from '../models/tweets.js'

export const getTweetsFromCategory = async (category) => {
    if(!category){
        throw new Error('Invalid Request');
    }
    return await twitterModel.findOne({category: category});
}