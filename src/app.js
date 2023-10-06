import express, { json } from 'express';
import cors from 'cors';
import router from './routes/index.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);


const port = 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})