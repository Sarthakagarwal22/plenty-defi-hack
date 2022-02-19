import express from 'express';
import _ from 'lodash';
import { Web3Storage } from 'web3.storage'

import {getCategoryonDate} from '../services/calendar.js';
import {setImageInDb, createImageFromBase64} from '../services/images.js';
import {getMetaData} from '../services/utils.js';
import {getTweetsFromCategoryAPI} from '../services/twitter.js';
import {sendMailUpdate} from '../services/mail.js';
import NodeCache from 'node-cache';
import {format} from 'date-fns';

import axios from 'axios';

const twitterRouter = express.Router();

const reqInProgress = "request-in-progress";
const aiIPFSList = "ai_urls";
const memCache = new NodeCache();
const token = process.env.IPFS_API_TOKEN
const client = new Web3Storage({ token })

twitterRouter.get('/getTweetsForDate', async (req, res, next) => {
    
    if (memCache.get(reqInProgress) == undefined) {
        
        memCache.set(reqInProgress, true);
        let prevDate = new Date();
        prevDate.setDate(prevDate.getDate() - 1);
        prevDate = format(prevDate, "MM-dd");

        let prevDateCategory;
        let tweetsFromPrevDay;
        try {
            prevDateCategory = await getCategoryonDate(prevDate);
            prevDateCategory = _.get(prevDateCategory, "category");
            tweetsFromPrevDay = await getTweetsFromCategoryAPI(prevDateCategory);
        }
        catch (e) {
            console.log(e);
            memCache.del(reqInProgress);
            memCache.del(aiIPFSList);
            next(e);
            return;
        }
        let aiURLObj = await getMetaData();
        let aiURL = _.get(aiURLObj, "metaData.aiUrl");
        if (!aiURL) {
            throw new error("AI URL not found");
        }
        aiURL += "/generate";
        res.send("Request started\n");
        let aiImageGeneratedIPFSArray = [];
        let allImagesGeneratedSuccessfully = true;
        for (const [idx,tweet] of tweetsFromPrevDay.entries()) {
            let body = {
                "prompts": tweet
            };
            let cid;
            const imageName = "./ai-" + idx + ".png";;
            try {
                const aiImageResp = await axios.post(aiURL, body);
                const base64Img = _.get(aiImageResp, "data.image_string");

                const file = await createImageFromBase64(imageName, base64Img);

                cid = await client.put(file);
                const mongoId = await setImageInDb(prevDate, cid, tweet);
                console.log(mongoId);

            } catch(e) {
                console.log(e);
                allImagesGeneratedSuccessfully = false;
                const mailSentResponse = await sendMailUpdate(imageName, "not successful", undefined, tweet);
                memCache.del(reqInProgress);
                memCache.del(aiIPFSList);
                next(e);
                return;
            }
            const ipfsLink = "https://" + cid + ".ipfs.dweb.link" + imageName.substring(1);
            console.log("ipfs: " + ipfsLink);

            if (memCache.get(aiIPFSList) === undefined) {
                aiImageGeneratedIPFSArray = [ipfsLink];
            } else {
                memCache.get(aiIPFSList).push(ipfsLink);
            }
            await memCache.set(aiIPFSList, aiImageGeneratedIPFSArray);
            const mailSentResponse = await sendMailUpdate(imageName, "successful", ipfsLink, tweet);
        }
        
        const finalAIImageIPFSArray = memCache.get(aiIPFSList);
        if (allImagesGeneratedSuccessfully) {
            memCache.set(prevDate, finalAIImageIPFSArray);
        }

        memCache.del(reqInProgress);
        memCache.del(aiIPFSList);
        res.send(finalAIImageIPFSArray);

    } else {
        res.send("Request in progress!");
    }
});

export default twitterRouter;