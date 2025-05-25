import express, { Router } from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import path from 'path';
//import userRouter from './routes/user.routes';


const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/projekat-pia")
mongoose.connection.once('open', () => {
    console.log("db connection ok")
})
const router = Router()

router.use('/user', userRouter)
app.use('/', router)
const uploadsPath = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));