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

export const getKabupatenByProvinsi = async (prov_id) => {
  try {
    const provinsiId = prov_id || null;
    const query = `SELECT * FROM kabupaten WHERE province_id=?`;
    const [rows] = await db.execute(query, [provinsiId]);
    return rows;

  } catch (error) {
    throw error;
  }
};

export const getKecamatanByKabupaten = async (kab_id) => {
  try {
    const kabupatenId = kab_id || null;
    const query = `SELECT * FROM kecamatan WHERE regency_id=?`;
    const [rows] = await db.execute(query, [kabupatenId]);
    return rows;

  } catch (error) {
    throw error;
  }
};

export const getKelurahanByKecamatan = async (kec_id) => {
  try {
    const kecamatanId = kec_id || null;
    const query = `SELECT * FROM kelurahan WHERE district_id=?`;
    const [rows] = await db.execute(query, [kecamatanId]);
    return rows;

  } catch (error) {
    throw error;
  }
};

export const createKelurahan = async (body) => {
  const query = 'INSERT INTO kelurahan (district_id, name) VALUES ( ?, ?)';
  const values = [body.kecamatan_id, body.kelurahanName];

  return db.execute(query, values);
};

export const getKelurahan = async () => {
  const query = `SELECT * FROM kelurahan`;

  return db.execute(query);
};