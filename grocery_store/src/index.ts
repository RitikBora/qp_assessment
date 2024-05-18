import express from 'express';
import bodyParser from 'body-parser'

import adminRoutes from './routes/admin';
import userRoutes from './routes/user';

const app = express();

app.use(bodyParser.json());

app.use("/admin/*" , adminRoutes);

app.use("/user/*" , userRoutes);


