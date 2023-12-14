import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_db'
});

const createTable = async () => {
  try {
    const connection = await db.getConnection();

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        address VARCHAR(255)
      );
    `;

    await connection.execute(createTableQuery);

    console.log('Tabel berhasil dibuat.');
    connection.release();
  } catch (error) {
    console.error('Error membuat tabel:', error);
  }
};

export { db, createTable };





