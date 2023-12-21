import multiparty from 'connect-multiparty';

const uploadMiddleware = multiparty({
  uploadDir: '../public/images', // Set the directory where uploaded files will be saved
  maxFilesSize: 10 * 1024 * 1024, // Set the maximum file size (in bytes) - here, it's set to 10 MB
});

export default uploadMiddleware;