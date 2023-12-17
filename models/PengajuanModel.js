import { db } from "../config/Database.js";

export const getAllPengajuan = async () => {
  try {
    const [rows] = await db.query(`SELECT pengajuan_id, user_id, jenis_surat, DATE_FORMAT(tanggal_pengajuan, '%Y-%m-%d %H:%i:%s') AS formatted_tanggal, proses FROM pengajuan
    `);
    return rows;
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

export const createPengajuan = async (body) => {
    const query = 'INSERT INTO pengajuan (user_id, jenis_surat, tanggal_pengajuan, proses) VALUES (?, ?, ?, ?)';
    const values = [body.user_id, body.jenis_surat, body.tanggal_pengajuan, body.proses];
    
    return db.execute(query, values);
};

export const getPengajuanByUserId = async (user_id) => {
  try {
    const userId = user_id || null;
    const query = 'SELECT * FROM pengajuan WHERE user_id = ?';
    const [rows] = await db.execute(query, [userId]);

    return rows;
  } catch (error) {
    throw error;
  }
};

export const updateProsesSuratPengantar = async (userId, newProses) => {
  try {
    const query = 'UPDATE pengajuan SET proses = ? WHERE pengajuan_id = ? AND jenis_surat = ?';
    const values = [newProses, userId, 'Surat Pengantar'];

    const [result] = await db.execute(query, values);

    return result;
  } catch (error) {
    throw error;
  }
};

// export const updateProsesSuratKeluarga = async (userId, newProses) => {
//   try {
//     const query = 'UPDATE pengajuan SET proses = ? WHERE user_id = ? AND jenis_surat = ?';
//     const values = [newProses, userId, 'Pembuatan Keluarga'];

//     const [result] = await db.execute(query, values);

//     return result;
//   } catch (error) {
//     throw error;
//   }
// };


export const updateProsesSuratKeluarga = async (userId, newProses) => {
  try {
    const query = 'UPDATE pengajuan SET proses = ? WHERE pengajuan_id = ? AND jenis_surat = ?';
    const values = [newProses, userId, 'Pembuatan Keluarga'];

    const [result] = await db.execute(query, values);

    return result;
  } catch (error) {
    throw error;
  }
};

export const updateProsesSuratTidakMampu = async (userId, newProses) => {
  try {
    const query = 'UPDATE pengajuan SET proses = ? WHERE pengajuan_id = ? AND jenis_surat = ?';
    const values = [newProses, userId, 'Keterangan Tidak Mampu'];

    const [result] = await db.execute(query, values);

    return result;
  } catch (error) {
    throw error;
  }
};