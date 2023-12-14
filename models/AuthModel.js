// AuthModel.js
import { db } from '../config/Database.js';

export const getUserByUsername = async (username) => {
  const query = 'SELECT * FROM usergeneral WHERE username = ?';
  const [result] = await db.query(query, [username]);
  return result[0];
};
