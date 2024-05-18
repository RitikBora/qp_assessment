import express from 'express';
import bodyParser from 'body-parser'

import adminRoutes from './routes/admin';
import userRoutes from './routes/user';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/health" , (req , res) =>   //health check
{
    return res.sendStatus(200);
})

app.use("/admin" , adminRoutes);

app.use("/user" , userRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});