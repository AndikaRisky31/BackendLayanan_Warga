// models/AdminKelurahanModel.js
import { db } from '../config/Database.js';

export const getAdminKelurahanByKelurahanId = async (kelurahan_id) => {
  const query = 'SELECT * FROM admin_kelurahan WHERE kelurahan_id = ?';

  try {
    const [rows] = await db.query(query, [Number(kelurahan_id)]);
    return rows;
  } catch (error) {
    throw error;
  }
};

export const getAdminKelurahanById = async(id)=>{
  const query = "SELECT * FROM admin_kelurahan WHERE id = ?";
  try {
    const [rows] = await db.query(query, [id]);
    return rows;
  } catch (error) {
    throw error;
  }
}
