import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import healthRouter from './routes/health.js';
import twitterRouter from './routes/twitter.js';
import calendarRouter from './routes/calendar.js';
import utilRouter from './routes/utils.js';

import errorHanlder from './utils/error-hanlder.js';

import './db/moongoose.js';

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/health', healthRouter);
app.use('/twitter', twitterRouter);
app.use('/calendar', calendarRouter);
app.use('/util', utilRouter);

app.use(errorHanlder);

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});
