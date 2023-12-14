import * as ArticleModel from '../models/ArticleModal.js';
import path from "path";
import fs from "fs";

const getArticles = async (req, res) => {
  try {
    const [data] = await ArticleModel.getArticles();

    res.json({
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
    const [data] = await ArticleModel.getArticleById(id);

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
  const { body } = req;
  const {name, email, address} = req.body;
  console.log(req.body);

  if (!(email && name && address)) {
    return res.status(400).json({
      message: 'You have submitted incorrect data.',
      data: null,
    });
  }

  try {
    await ArticleModel.saveArticle(body);
    res.status(201).json({
      message: 'CREATE new user success',
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log(body)
  try {
    await ArticleModel.updateArticle(body, id);
    
    res.json({
      message: 'UPDATE Article success',
      data: {
        id: id,...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    await ArticleModel.deleteArticle(id);
    res.json({
      message: 'DELETE Article success',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

export {
  getArticles,
  getArticleById,
  saveArticle,
  updateArticle,
  deleteArticle,
};
