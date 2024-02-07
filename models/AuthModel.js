// AuthModel.js
import { db } from '../config/Database.js';

export const getUserById = async (user_id) => {
  const query = 'SELECT * FROM user WHERE user_id = ?';
  const [result] = await db.query(query, [user_id]);
  return result[0];
};

export const updateToken = async (user_id,tokenFCM) => {
  try {
    const query = 'UPDATE user SET tokenFCM = ? WHERE user_id = ?';
    const values = [tokenFCM,user_id];
    console.log('Query:', query, 'Values:', values);
    return await db.execute(query, values);
  } catch (error) {
    console.error("Error updating token:", error);
    throw error;
  }
}
