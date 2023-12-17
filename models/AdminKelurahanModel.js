// models/AdminKelurahanModel.js
import { db } from '../config/Database.js';

const getAdminKelurahanByKelurahan = async () => {
  const query = `SELECT * FROM admin_kelurahan`;

  return db.execute(query);
};

const getAdminKelurahanByKelurahanById = async (id) => {
  const query = `SELECT * FROM admin_kelurahan WHERE kelurahan_id=?`;

  return db.execute(query, [id]);
}

const createAdminKelurahanByKelurahan = async (body) => {
  const query = 'INSERT INTO admin_kelurahan (kelurahan_id, nama, password, pangkat, nomor, email, alamat, imageURL) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [body.kelurahan_id, body.nama, body.password, body.pangkat, body.nomor, body.email, body.alamat, body.imageURL];

  return db.execute(query, values);
};

// const  updateAdminKelurahanByKelurahan = async (body, id) => {
//   const query = 'UPDATE admin_kelurahan SET kelurahan_id = ?, nama = ?, password = ?, pangkat = ?, nomor = ?, email = ?, alamat = ?, imageURL = ? WHERE id = ?';
//   const values = [];

//   return db.execute(query, [body.kelurahan_id], [body.nama], [body.password], [body.pangkat], [body.nomor], [body.email], [body.alamat], [body.imageURL], [id]);
// }

const updateAdminKelurahanByKelurahan = async (body, id) => {
  const query = 'UPDATE admin_kelurahan SET kelurahan_id = ?, nama = ?, password = ?, pangkat = ?, nomor = ?, email = ?, alamat = ?, imageURL = ? WHERE id = ?';
  const values = [
    body.kelurahan_id,
    body.nama,
    body.password,
    body.pangkat,
    body.nomor,
    body.email,
    body.alamat,
    body.imageURL,
    id, // Parameter terakhir untuk WHERE id = ?
  ];

  return db.execute(query, values);
};


const deleteAdminKelurahanByKelurahan =  async (id) => {
  const query = 'DELETE FROM admin_kelurahan WHERE id=?';

  return db.execute(query, [id]);
}




export {
  getAdminKelurahanByKelurahan,
  getAdminKelurahanByKelurahanById,
  createAdminKelurahanByKelurahan,
  updateAdminKelurahanByKelurahan,
  deleteAdminKelurahanByKelurahan,
};
