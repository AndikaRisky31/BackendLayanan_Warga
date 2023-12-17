import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'layanan'
});

const createTable = async () => {
  const connection = await db.getConnection();

  try {
    console.log('Connected to MySQL database');

    const createSuperAdminTable = `
      CREATE TABLE IF NOT EXISTS super_admin (
        superadmin_id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        username VARCHAR(45) NOT NULL,
        super_admin_password VARCHAR(20) NOT NULL,
        PRIMARY KEY (superadmin_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await connection.query(createSuperAdminTable);
    console.log('super_admin table created (if not exists)');

    const createKelurahanTableQuery = `
      CREATE TABLE IF NOT EXISTS kelurahan (
        kelurahan_id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        nama_kelurahan VARCHAR(45) DEFAULT NULL,
        PRIMARY KEY (kelurahan_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await connection.query(createKelurahanTableQuery);
    console.log('kelurahan table created (if not exists)');

    const createAdminKelurahanTable = `
      CREATE TABLE IF NOT EXISTS admin_kelurahan (
        id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        kelurahan_id INT(10) UNSIGNED NOT NULL,
        nama VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        pangkat VARCHAR(20) DEFAULT NULL,
        nomor VARCHAR(15) DEFAULT NULL,
        email VARCHAR(255) NOT NULL,
        alamat VARCHAR(100) NOT NULL,
        imageURL VARCHAR(255) NOT NULL,
        PRIMARY KEY (id),
        KEY admin_kelurahan_FKIndex1 (kelurahan_id),
        CONSTRAINT admin_kelurahan_ibfk_1 FOREIGN KEY (kelurahan_id) REFERENCES kelurahan (kelurahan_id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await connection.query(createAdminKelurahanTable);
    console.log('admin_kelurahan table created (if not exists)');

    const createAgendaTable = `
      CREATE TABLE IF NOT EXISTS agenda (
        agenda_id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        kelurahan_id INT(10) UNSIGNED NOT NULL,
        judul VARCHAR(255) DEFAULT NULL,
        tanggal DATETIME DEFAULT NULL,
        imageURL VARCHAR(255) NOT NULL,
        tempat VARCHAR(20) NOT NULL,
        PRIMARY KEY (agenda_id),
        KEY agenda_FKIndex1 (kelurahan_id),
        CONSTRAINT agenda_ibfk_1 FOREIGN KEY (kelurahan_id) REFERENCES kelurahan (kelurahan_id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await connection.query(createAgendaTable);
    console.log('agenda table created (if not exists)');
    
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS user (
        user_id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        kelurahan_id INT(10) UNSIGNED NOT NULL,
        username VARCHAR(40) DEFAULT NULL,
        password VARCHAR(20) DEFAULT NULL,
        email VARCHAR(45) DEFAULT NULL,
        nomor VARCHAR(15) DEFAULT NULL,
        alamat TEXT DEFAULT NULL,
        tempatLahir TEXT DEFAULT NULL,
        TanggalLahir DATE DEFAULT NULL,
        imageURL VARCHAR(255) DEFAULT NULL,
        PRIMARY KEY (user_id),
        KEY user_FKIndex1 (kelurahan_id),
        CONSTRAINT user_ibfk_1 FOREIGN KEY (kelurahan_id) REFERENCES kelurahan (kelurahan_id) ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await connection.query(createUserTableQuery);
    console.log('usergeneral table created (if not exists)');

    const createLaporanTableQuery = `
      CREATE TABLE IF NOT EXISTS laporan (
        laporan_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        user_id INT(10) UNSIGNED NOT NULL,
        bukti_laporan VARCHAR(255) NOT NULL,
        lokasi_laporan TEXT NOT NULL,
        jenis_laporan ENUM('Infrastruktur dan Lingkungan','Keamanan dan Ketertiban','Ekonomi','Kesehatan dan Layanan Kesehatan') NOT NULL,
        deskripsi TEXT DEFAULT NULL,
        PRIMARY KEY (laporan_ID),
        KEY Laporan_FKIndex1 (user_id),
        CONSTRAINT laporan_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;

    await connection.query(createLaporanTableQuery);
    console.log('laporan table created (if not exists)');

    const createPengajuanTableQuery = `
      CREATE TABLE IF NOT EXISTS pengajuan (
        pengajuan_id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        user_id INT(10) UNSIGNED NOT NULL,
        jenis_surat ENUM('Surat Pengantar','Keterangan Tidak Mampu','Pembuatan Keluarga') NOT NULL,
        tanggal_pengajuan DATETIME NOT NULL,
        proses ENUM('%Terkirim','Diproses','Sudah Diproses','Selesai') NOT NULL,
        PRIMARY KEY (pengajuan_id),
        KEY pengajuan_FKIndex1 (user_id),
        CONSTRAINT pengajuan_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await connection.query(createPengajuanTableQuery);
    console.log('pengajuan table created (if not exists)');


  } catch (err) {
    throw err;
  } finally {
    // Release the connection
    connection.release();
    console.log('Connection released');
  }
};

export { db, createTable };
