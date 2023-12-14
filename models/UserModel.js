// UserModel.js
import { db } from '../config/Database.js';

export const createUser = async (username, password, email) => {
  try {
    const query = 'INSERT INTO usergeneral (username, userpassword, email) VALUES (?, ?, ?)';
    const result = await db.query(query, [username, password, email]);
    return result;
  } catch (err) {
    console.error('Terjadi kesalahan saat menambahkan data:', err);
    throw err;
  }
};

export const getAllUsers = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM usergeneral');
    return rows;
  } catch (err) {
    console.error('Terjadi kesalahan:', err);
    throw err;
  }
};

export const updateUser = async (user_id, username, nomor, email, alamat, tempatLahir) => {
  try {
    const query = 'UPDATE usergeneral SET username = ?, Nomor = ?, email = ?, alamat = ?, tempatLahir = ? WHERE user_id = ?';
    const result = await db.query(query, [username, nomor, email, alamat, tempatLahir, user_id]);
    return result;
  } catch (err) {
    console.error('Terjadi kesalahan saat mengupdate data:', err);
    throw err;
  }
};

export const getUserById = async (user_id) => {
  try {
    const query = 'SELECT * FROM usergeneral WHERE user_id = ? LIMIT 1';
    const [result] = await db.query(query, [Number(user_id)]);
    return result[0];
  } catch (err) {
    console.error('Terjadi kesalahan saat mengambil data pengguna:', err);
    throw err;
  }
};
