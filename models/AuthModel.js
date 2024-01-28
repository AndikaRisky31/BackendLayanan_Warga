// AuthModel.js
import { async } from '@firebase/util';
import { db } from '../config/Database.js';

export const getUserById = async (user_id) => {
  const query = 'SELECT * FROM user WHERE user_id = ?';
  const [result] = await db.query(query, [user_id]);
  return result[0];
};

export const updateToken = async(token,user_id)=>{
  const query = 'UPDATE user set token=? WHERE user_id=?';
  const values = [token,user_id];
  return db.execute(query, values);
}