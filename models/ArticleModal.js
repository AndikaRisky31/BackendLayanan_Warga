import { db } from '../config/Database.js';

const getArticles = async () => {
  const SQLQuery = `SELECT * FROM article`;
  return db.execute(SQLQuery);
};

const getArticleById = async (id) => {
  const SQLQuery = `SELECT * FROM article WHERE article_id=?`;
  return db.execute(SQLQuery, [id]);
};

const saveArticle = async (body, fileName, url) => {
  const SQLQuery = `INSERT INTO article (author, date, title, content, image, url) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [body.author, body.date, body.title, body.content, fileName, url];

  return db.execute(SQLQuery, values);
};

const updateArticle = async (body, fileName, url, id) => {
  const SQLQuery = 'UPDATE article SET author=?, date=?, title=?, content=?, image=?, url=? WHERE article_id=?';
  const values = [body.author, body.date, body.title, body.content, fileName, url];

  return db.execute(SQLQuery, [...values, id]);
};

const getImage = async (id) => {
  const SQLQuery = 'SELECT image FROM article WHERE article_id=?';
  return db.execute(SQLQuery, [id]);
};


const deleteArticle = async (id) => {
  const SQLQuery = 'DELETE FROM article WHERE article_id=?';

  return db.execute(SQLQuery, [id]);
};

export {
  getArticles,
  getArticleById,
  saveArticle,
  updateArticle,
  deleteArticle,
  getImage,
};

