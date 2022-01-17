import express from 'express';
import healthRouter from './routes/health.js';

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/health', healthRouter);

app.listen(5000, () => {
    console.log(`Server running on port 3000`);
});
