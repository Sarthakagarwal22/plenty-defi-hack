import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();

import NodeCache from 'node-cache';

import healthRouter from './routes/health.js';
import twitterRouter from './routes/twitter.js';
import calendarRouter from './routes/calendar.js';
import utilRouter from './routes/utils.js';
import imagesRouter from './routes/images.js';

import errorHanlder from './utils/error-hanlder.js';

import './db/moongoose.js';

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/health', healthRouter);
app.use('/twitter', twitterRouter);
app.use('/calendar', calendarRouter);
app.use('/util', utilRouter);
app.use('/images', imagesRouter);

app.use(errorHanlder);

export const imagesCache = new NodeCache({checkperiod: 0});
export const tweetsCache = new NodeCache({checkperiod: 0});

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});
