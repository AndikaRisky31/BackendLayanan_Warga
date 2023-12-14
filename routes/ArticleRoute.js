import express from 'express';
import * as ArticleController from '../controllers/ArticleController.js';

const router = express.Router();

router.get('/articles', ArticleController.getArticles);
router.get('/articles/:id', ArticleController.getArticleById);
router.post('/articles', ArticleController.saveArticle);
router.patch('/articles/:id', ArticleController.updateArticle);
router.delete('/articles/:id', ArticleController.deleteArticle);

export default router;
