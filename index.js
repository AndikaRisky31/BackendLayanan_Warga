import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import { createTable } from './config/Database.js'; // Adjust the path accordingly
import ArticleRoute from './routes/ArticleRoute.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import agendaRoutes from './routes/agendaRoutes.js';
import adminKelurahanRoutes from './routes/adminKelurahanRoutes.js';
import pengajuanRoutes from './routes/pengajuanRoutes.js';
import daerahRoutes from './routes/daerahRoutes.js';
import laporanRoutes from './routes/laporanRoutes.js'
import fileUpload from 'express-fileupload';

var PORT =   process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(fileUpload());
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use('/api',ArticleRoute);
app.use('/api/users',userRoutes);
app.use(pengajuanRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/agenda', agendaRoutes);
app.use(adminKelurahanRoutes);
app.use(laporanRoutes);
app.use('/api/daerah',daerahRoutes)

app.get('/', (req, res) => {
  res.send('API Works!!');
})

const startServer = async () => {
  try {
    console.log('Database terhubung dan tabel berhasil dibuat.');
    app.listen(PORT, () => {
      console.log(`Server berhasil di running di port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();