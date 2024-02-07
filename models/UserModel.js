// UserModel.js
import { db } from '../config/Database.js';

export const createUser = async (body) => {
  console.log(body);

  const query = `INSERT INTO user (kelurahan_id, username, user_id, nomor, alamat, kota) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [body.kelurahan_id, body.username, body.user_id,body.nomor, body.alamat, body.kota];

  try {
    const result = await db.execute(query, values);
    return result;
  } catch (error) {
    console.error('Gagal menjalankan query createUser:', error);
    throw error;
  }
};

// Metode untuk melakukan login
export const getUserByEmail = async (email) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM user WHERE Email = ?', [email]);
    return rows[0]; // Mengembalikan baris pertama atau null jika tidak ada hasil
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    throw error; // Menyebabkan kembali kesalahan untuk penanganan di tingkat yang lebih tinggi
  }
};


export const getAllUsers = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM user');
    return rows;
  } catch (err) {
    console.error('Terjadi kesalahan:', err);
    throw err;
  }
};

export const updateUser = async (body, id) => {
  const query = `UPDATE user SET kelurahan_id=?, username=?, password=?, email=?, nomor=?, alamat=?, kota=?, imageURL=? WHERE user_id=?`;
  const values = [
    body.kelurahan_id,
    body.username,
    body.password,
    body.email,
    body.nomor,
    body.alamat,
    body.kota,
    body.imageURL,
    id,
  ];

  return db.execute(query, values);
};

export const getUserById = async (user_id) => {
  const query = 'SELECT * FROM user WHERE user_id = ?';
  const [result] = await db.query(query, [user_id]);
  return result[0];
};

export const getUserByKelurahan = async (kel_id) => {
  try {
    const kelurahanId = kel_id || null;
    const query = `SELECT * FROM user WHERE kelurahan_id=?`;
    const [rows] = await db.execute(query, [kelurahanId]);
    return rows;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  const query = 'DELETE FROM user WHERE user_id=?';

  return db.execute(query, [id]);
}

