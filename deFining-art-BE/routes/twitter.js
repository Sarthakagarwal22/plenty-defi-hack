import express from 'express';
import _ from 'lodash';
import { Web3Storage } from 'web3.storage'

import {getCategoryonDate} from '../services/calendar.js';
import {setImageInDb} from '../services/images.js';
import {getMetaData} from '../services/utils.js';
import NodeCache from 'node-cache';
import {format} from 'date-fns';
import {Blob} from 'node:buffer';

import axios from 'axios';
import fs from 'fs';

const twitterRouter = express.Router();

const reqInProgress = "request-in-progress";
const aiIPFSList = "ai_urls";
const memCache = new NodeCache();
const token = process.env.API_TOKEN
const client = new Web3Storage({ token })
const tweets = ["Happy Birthday"]

twitterRouter.get('/getTweetsForDate', async (req, res, next) => {
    
    if (memCache.get(reqInProgress) == undefined) {
        
        memCache.set(reqInProgress, true);
        let prevDate = new Date();
        prevDate.setDate(prevDate.getDate() - 1);
        prevDate = format(prevDate, "MM-dd");

        let prevDateCategory;
        let tweetsFromPrevDay = ["", "", ""];
        try {
            prevDateCategory = await getCategoryonDate(prevDate);
            prevDateCategory = _.get(prevDateCategory, "category");
            // call twitter api to get tweets
            tweetsFromPrevDay = tweets; // some call to twitter dev api //= getTweetsFromCategory(prevDateCategory);
        }
        catch (e) {
            console.log(e);
            return;
            // next(e)
        }  
        let aiURLObj = await getMetaData(); // modify in parsing
        let aiURL = _.get(aiURLObj, "metaData.aiUrl");
        if (!aiURL) {
            throw new error("AI URL not found");
        }
        aiURL += "/generate";
        res.send("Request started");
        let aiImageGeneratedIPFSArray = [];
        let allImagesGeneratedSuccessfully = true;
        for (let tweet of tweetsFromPrevDay) {
            let body = {
                "prompts": tweet
            };
            let cid;
            try {
                const aiImageBin = await axios.post(aiURL, body);
                
                
                // const file = await getFilesFromPath(_.get(aiImageBin, "data"));
                const ffff = _.get(aiImageBin, "data");
                await fs.writeFileSync("ai.png", ffff);

                console.log(typeof ffff);
                // const fffBlob = new Blob(ffff);
                const file = await getFilesFromPath("./ai.png");
                cid = await client.put();
                const mongoId = await setImageInDb(prevDate, cid, tweet);
            } catch(e) {
                console.log(e);
                allImagesGeneratedSuccessfully = false;
                next(e);
                return;
            }

            console.log(cid);

            if (memCache.get(aiIPFSList) === undefined) {
                aiImageGeneratedIPFSArray = [cid];
            } else {
                memCache.get(aiIPFSList).push(cid);
            }
            await memCache.set(aiIPFSList, aiImageGeneratedIPFSArray);
        }
        
        const finalAIImageIPFSArray = memCache.get(aiIPFSList);
        if (allImagesGeneratedSuccessfully) {
            // send a mail
            memCache.set(Date.now, "image ipfs array here");
        }

        memCache.del(reqInProgress);
        memCache.del(aiIPFSList);
        res.send(finalAIImageIPFSArray);

    } else {
        res.send("Request in progress!");
    }
});

export default twitterRouter;