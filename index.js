import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import ArticleRoute from './routes/ArticleRoute.js';
import bodyParser from 'body-parser';
import { createTable } from './config/database.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extented: true }));
app.use(cors());
app.use(bodyParser.json())
app.use(ArticleRoute);

const startServer = async () => {
  app.listen(PORT, async () => {
    await createTable();
    console.log(`Server berhasil di running di port ${PORT}`);
  });
};

startServer();
