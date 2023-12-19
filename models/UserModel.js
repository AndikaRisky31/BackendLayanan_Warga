// UserModel.js
import { db } from '../config/Database.js';
import upload from '../middleware/multer.js';

export const createUser = async (body, req, res) => {
  try {
    // Gunakan middleware multer untuk menangani pengunggahan file
    upload.single('image')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Tangani kesalahan multer
        return res.status(400).json({ success: false, message: 'Error uploading file.' });
      } else if (err) {
        // Tangani kesalahan lainnya
        return res.status(500).json({ success: false, message: 'Internal server error.' });
      }

      // Dapatkan path file yang diunggah
      const imagePath = req.file ? req.file.path : null;

      // Lanjutkan dengan menyimpan data pengguna dan URL gambar ke database
      const query = 'INSERT INTO user (kelurahan_id, username, password, email, nomor, alamat, kota, imageURL) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [body.kelurahan_id, body.username, body.password, body.email, body.nomor, body.alamat, body.kota, imagePath];

      const result = await db.execute(query, values);

      // Jika pengguna berhasil ditambahkan, kirim respons
      res.status(201).json({ success: true, message: 'User created successfully.' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
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

export const getUserById = async (id) => {
  const query = `SELECT * FROM user WHERE user_id=?`;
  return db.execute(query, [id]);
};

export const getUserByKelurahan = async (kel_id) => {
  try {
    const kelurahanId = kel_id || null;
    const query = `SELECT * FROM user WHERE kelurahan_id=?`;
    const [rows] = await db.execute(query, [kelurahanId]);

    return rows; // Mengembalikan array objek
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  const query = 'DELETE FROM user WHERE user_id=?';

  return db.execute(query, [id]);
}
