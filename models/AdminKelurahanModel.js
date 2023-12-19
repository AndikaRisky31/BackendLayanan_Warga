
import { db } from '../config/Database.js';

const getAdminKelurahanByKelurahan = async () => {
  const query = `SELECT * FROM admin_kelurahan`;

  return db.execute(query);
};

const getAdminKelurahanByKelurahanId = async (id) => {
  const query = `SELECT * FROM admin_kelurahan WHERE id=?`;

  return db.execute(query, [id]);
}

const createAdminKelurahanByKelurahan = async (body) => {
  const query = 'INSERT INTO admin_kelurahan (kelurahan_id, nama, password, pangkat, nomor, email, alamat, imageURL) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [body.kelurahan_id, body.nama, body.password, body.pangkat, body.nomor, body.email, body.alamat, body.imageURL];

  return db.execute(query, values);
};

const updateAdminKelurahanByKelurahan = async (body, id) => {
  const query = `
    UPDATE admin_kelurahan 
    SET 
      kelurahan_id = COALESCE(?, kelurahan_id), 
      nama = COALESCE(?, nama),
      password = COALESCE(?, password),
      pangkat = COALESCE(?, pangkat),
      nomor = COALESCE(?, nomor),
      email = COALESCE(?, email),
      alamat = COALESCE(?, alamat),
      imageURL = COALESCE(?, imageURL)
    WHERE id = ?;
  `;
  
  const values = [
    body.kelurahan_id,
    body.nama,
    body.password,
    body.pangkat,
    body.nomor,
    body.email,
    body.alamat,
    body.imageURL,
    id,
  ];

  const sanitizedValues = values.map(value => (value !== undefined ? value : null));

  return db.execute(query, sanitizedValues);
};



const deleteAdminKelurahanByKelurahan =  async (id) => {
  const query = 'DELETE FROM admin_kelurahan WHERE id=?';

  return db.execute(query, [id]);
}




export {
  getAdminKelurahanByKelurahan,
  getAdminKelurahanByKelurahanId,
  createAdminKelurahanByKelurahan,
  updateAdminKelurahanByKelurahan,
  deleteAdminKelurahanByKelurahan,
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
