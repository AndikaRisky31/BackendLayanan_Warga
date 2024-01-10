import express from 'express';
import * as ArticleController from '../controllers/ArticleController.js';

const router = express.Router();

router.get('/articles', ArticleController.getArticles);
router.get('/articles/:id', ArticleController.getArticleById);
router.post('/articles', upload.none(), ArticleController.saveArticle);
router.patch('/articles/:id', upload.none(), ArticleController.updateArticle);
router.delete('/articles/:id', ArticleController.deleteArticle);
router.post('/latest', upload.none(), ArticleController.getLatestArticles);
router.post('/page', upload.none(), ArticleController.getArticlesByPage);

export default router;
