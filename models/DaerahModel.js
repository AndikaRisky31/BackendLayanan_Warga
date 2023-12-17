import { db } from '../config/Database.js';

export const getAllProvinsi = async () => {
  const query = 'SELECT * FROM provinsi';

  try {
    const [rows] = await db.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};