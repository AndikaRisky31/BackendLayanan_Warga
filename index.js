import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createTable } from './config/Database.js'; // Adjust the path accordingly
import ArticleRoute from './routes/ArticleRoute.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import agendaRoutes from './routes/agendaRoutes.js';
import adminKelurahanRoutes from './routes/adminKelurahanRoutes.js';
import pengajuanRoutes from './routes/pengajuanRoutes.js';
import daerahRoutes from './routes/daerahRoutes.js';
import laporanRoutes from './routes/laporanRoutes.js';
import multiparty from 'connect-multiparty';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware for handling file uploads with connect-multiparty
const uploadMiddleware = multiparty({
  uploadDir: './public/images', // Set the directory where uploaded files will be saved
  maxFilesSize: 10 * 1024 * 1024, // Set the maximum file size (in bytes) - here, it's set to 10 MB
});

// Middleware for allowing CORS
app.use(cors());

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Middleware for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serving static files from the 'public' directory
app.use(express.static("public"));

// Custom middleware (you might need to define/uploadMiddleware)
app.use(uploadMiddleware);

// Serving static files from the '/public' path
app.use('/public', express.static(__dirname + '/public'));

// Routes
app.use('/api', ArticleRoute);
app.use(userRoutes);
app.use(pengajuanRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/agenda', agendaRoutes);
app.use(adminKelurahanRoutes);
app.use(laporanRoutes);
app.use('/api/daerah', daerahRoutes);

const startServer = async () => {
  try {
    // Ensure database table is created before starting the server
    await createTable();

    console.log('Database connected, and tables successfully created.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();
