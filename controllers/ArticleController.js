import * as ArticleModel from '../models/ArticleModal.js';
import { BlobServiceClient } from "@azure/storage-blob";
import path from "path";
import fs from "fs";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = "articles";

const getArticles = async (req, res) => {
  try {
    const [data] = await ArticleModel.getArticles();
    console.log(data);
    res.status(201).json({
      message: 'GET all Article success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const [data] = await ArticleModel.getArticleById(id)

    res.json({
      message: 'GET Article success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};


const saveArticle = async (req, res) => {
  try {
    const { body } = req;

    if (!req.files || !req.files.file) {
      return res.status(422).json({ msg: 'File tidak ditemukan' });
    }

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = `${Date.now()}_${file.md5}${ext}`;
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    const allowedTypes = ['.png', '.jpg', '.jpeg'];

    if (!allowedTypes.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: 'Format gambar tidak sesuai' });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({ msg: 'Ukuran maksimal gambar hanya 5 MB' });
    }

    const stream = Buffer.from(file.data);

    console.log("Starting upload...");
    await blockBlobClient.upload(stream, stream.length, { blobHTTPHeaders: { blobContentType: file.mimetype } });
    console.log("Upload completed.");

    // Perbarui URL sesuai dengan format yang benar
    const url = `https://imagelayang.blob.core.windows.net/articles/${fileName}`;

    try {
      await ArticleModel.saveArticle(body, fileName, url);

      res.status(201).json({
        message: 'CREATE new article success',
        data: body,
      });
    } catch (error) {
      console.error("Error in ArticleModel.saveArticle:", error);
      res.status(500).json({
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  } catch (error) {
    console.error("Error in saveArticle:", error);
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};



const updateArticle = async (req, res) => {
  const { id } = req.params;

  async function getImageResult() {
    try {
      let imageResult = await ArticleModel.getImage(id);
      let getImage = imageResult[0][0].image;
      return getImage;
    } catch (error) {
      console.error("Error fetching image:", error);
      throw error;
    }
  }

  try {
    const article = await ArticleModel.getArticleById(id);

    if (!article) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const image1 = await getImageResult();

    let fileName = image1;

    if (req.files && req.files.file) {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = `${file.md5}${ext}`;
      const allowedTypes = ['.png', '.jpg', '.jpeg'];

      if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Format gambar tidak sesuai" });
      }

      if (fileSize > 5000000) {
        return res.status(422).json({ msg: "Ukuran maksimal gambar hanya 5 MB" });
      }

      const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
      const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);

      const stream = Buffer.from(file.data);
      const uploadOptions = { bufferSize: 4 * 1024 * 1024, maxBuffers: 20 };

      console.log("Starting uploadStream...");
      await blockBlobClient.uploadData(stream, { blobHTTPHeaders: { blobContentType: file.mimetype } });
      console.log("UploadStream completed.");

      const url = `https://imagelayang.blob.core.windows.net/articles/${fileName}`;

      // Hapus gambar lama di Azure Storage
      try {
        const oldBlobClient = containerClient.getBlockBlobClient(image1);
        await oldBlobClient.delete();
      } catch (error) {
        console.error("Error deleting old image:", error);
      }
    }

    const { body } = req;
    const url = `https://imagelayang.blob.core.windows.net/articles/${fileName}`;

    await ArticleModel.updateArticle(body, fileName, url, id);

    res.json({
      message: 'UPDATE Article success',
      data: {
        id: id,
        ...body,
        image: url, // tambahkan url gambar dalam respons
      },
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};


const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const image1 = await getImageResult(id);
    const article = await ArticleModel.getArticleById(id);
    if (!article) {
      return res.status(404).json({ msg: "No Data Found" });
    }

    const filepath = `./public/imagesArticle/${image1}`;
    fs.unlinkSync(filepath);

    await ArticleModel.deleteArticle(id);

    res.json({
      message: 'DELETE Article success',
      data: null,
    });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
};

async function getImageResult(id) {
  try {
    const imageResult = await ArticleModel.getImage(id);
    const getImage = imageResult[0][0].image;
    return getImage;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}
const getLatestArticles = async (req, res) => {
  try {
    const { size } = req.body;
    const latestArticles = await ArticleModel.getLatestArticles(size);
    res.json(latestArticles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getArticlesByPage = async (req, res) => {
  try {
    const { page, pageSize } = req.body;
    const articles = await ArticleModel.getArticlesByPage(page, pageSize);
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export {
  getArticles,
  getArticleById,
  saveArticle,
  updateArticle,
  deleteArticle,
  getLatestArticles,
  getArticlesByPage
};
