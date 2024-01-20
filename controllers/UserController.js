// UserController.js
import * as UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

export const createUser = async (req, res) => {
  const { body } = req;
  const { kelurahan_id, username, password, email, nomor, alamat, kota } = req.body;

  if (!(kelurahan_id && username && password && email && nomor && alamat && kota)) {
    console.log(body);
    return res.status(400).json({
      message: "Format data yang Anda masukkan salah!",
      data: body
    });
  }

  try {
    // Hash password before creating user
    const hashedPassword = await hashPassword(password);
    const userData = { kelurahan_id, username, password: hashedPassword, email, nomor, alamat, kota };

    await UserModel.createUser(userData);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userData,
    });
  } catch (error) {
    console.error("Error in createUser.UserController: ", error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const data = await UserModel.getAllUsers();
    console.log(data);
    res.json({
      message: 'GET all Users success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log('Received Admin Kelurahan request - Request Body:', JSON.stringify(body));

  try {
    await UserModel.updateUser(body, id);

    res.json({
      message: "Update User Success",
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password diperlukan' });
    }

    // Retrieve user by email
    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Email tidak ditemukan' });
    }

    // Check if the provided password matches the stored hashed password
    if (!user.password) {
      return res.status(500).json({ error: 'Password pengguna tidak tersedia' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Password salah' });
    }
    
    res.status(200).json({
      email: user.email
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [data] = await UserModel.getUserById(id);
    console.log("menerima request by id",id)
    res.json({
      message: 'GET User By Id success',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

export const getUserByKelurahan = async (req, res) => {
  try {
    const kelurahan_id = req.params.kelurahan_id;
    const data = await UserModel.getUserByKelurahan(kelurahan_id);

    res.json({
      message: 'GET User By Kelurahan success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.deleteUser(id);

    res.json({
      message: 'Delete User success',
      data: {
        id: id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
}