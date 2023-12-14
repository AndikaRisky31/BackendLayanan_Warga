import { db } from '../config/Database.js';

const getArticles = async () => {
  const SQLQuery = `SELECT * FROM users`;
  return db.execute(SQLQuery);
};

const getArticleById = async (id) => {
  const SQLQuery = `SELECT * FROM users WHERE id=?`;
  return db.execute(SQLQuery, [id]);
};

const saveArticle = async (body) => {
  const SQLQuery = `INSERT INTO users (name, email, address) VALUES (?, ?, ?)`;
  const values = [body.name, body.email, body.address];

  return db.execute(SQLQuery, values);
};

const updateArticle = async (body, id) => {
  const SQLQuery = 'UPDATE users SET name=?, email=?, address=? WHERE id=?';
  const values = [];

  return db.execute(SQLQuery, [body.name], [body.email], [body.address], [id]);
};

const deleteArticle = async (id) => {
  const SQLQuery = 'DELETE FROM users WHERE id=?';

  return db.execute(SQLQuery, [id]);
};

export {
  getArticles,
  getArticleById,
  saveArticle,
  updateArticle,
  deleteArticle,
};

