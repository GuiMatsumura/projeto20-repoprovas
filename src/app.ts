import express, { json } from 'express';
import 'express-async-errors';
import handleErrorsMiddleware from './middlewares/handleErrorsMiddleware';
import router from './routes/index';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(handleErrorsMiddleware);

export default app;
