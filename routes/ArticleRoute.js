import express from 'express';
import * as ArticleController from '../controllers/ArticleController.js';

const router = express.Router();

router.get('/api/articles', ArticleController.getArticles);
router.get('/api/articles/:id', ArticleController.getArticleById);
router.post('/api/articles', ArticleController.saveArticle);
router.patch('/api/articles/:id', ArticleController.updateArticle);
router.delete('/api/articles/:id', ArticleController.deleteArticle);

export default router;
