import { db } from "../config/Database.js";

export const createLaporan = async (body,fileLaporPath) => {
  const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const query = `INSERT INTO laporan (user_id, bukti_laporan, lokasi_laporan, jenis_laporan, deskripsi,waktu) VALUES (?, ?, ?, ?, ?,?)`;
    const values = [body.user_id, fileLaporPath, body.lokasi_laporan, body.jenis_laporan, body.deskripsi,currentDateTime];
    
    return db.execute(query, values);
};

export const getAllLaporan = async () => {
    try {
      const [rows] = await db.query('SELECT * FROM laporan');
      return rows;
    } catch (err) {
      console.error('Terjadi kesalahan:', err);
      throw err;
    }
};

export const getLaporanByUserId = async (user_id) => {
    try {
      const userId = user_id || null;
      const query = 'SELECT * FROM laporan WHERE user_id = ?';
      const [rows] = await db.execute(query, [userId]);
  
      return rows;
    } catch (error) {
      throw error;
    }
  };

  export const getEkonomiLaporan = async () => {
    const query = 'SELECT * FROM laporan WHERE jenis_laporan = ?';
    const values = ['Ekonomi'];
  
    try {
      const [rows] = await db.execute(query, values);
      return rows;
    } catch (error) {
      throw error;
    }
  };

  export const getKeamananLaporan = async () => {
    const query = 'SELECT * FROM laporan WHERE jenis_laporan = ?';
    const values = ['Keamanan dan Ketertiban'];
  
    try {
      const [rows] = await db.execute(query, values);
      return rows;
    } catch (error) {
      throw error;
    }
  };

  export const getLingkunganLaporan = async () => {
    const query = 'SELECT * FROM laporan WHERE jenis_laporan = ?';
    const values = ['Infrastruktur dan Lingkungan'];
  
    try {
      const [rows] = await db.execute(query, values);
      return rows;
    } catch (error) {
      throw error;
    }
  };

  export const getKesehatanLaporan = async () => {
    const query = 'SELECT * FROM laporan WHERE jenis_laporan = ?';
    const values = ['Kesehatan dan Layanan Kesehatan'];
  
    try {
      const [rows] = await db.execute(query, values);
      return rows;
    } catch (error) {
      throw error;
    }
  };
  