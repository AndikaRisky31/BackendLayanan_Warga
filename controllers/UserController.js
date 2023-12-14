// UserController.js
import * as UserModel from '../models/UserModel.js';

export const createUser = async (req, res) => {
  try {
    const { username, userpassword, email } = req.body;
    const result = await UserModel.createUser(username, userpassword, email);

    res.json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
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
  try {
    const { user_id, username, nomor, email, alamat, tempatLahir } = req.body;
    const result = await UserModel.updateUser(user_id, username, nomor, email, alamat, tempatLahir);

    if (result.affectedRows > 0) {
      const fetchUpdatedUserDataQuery = await UserModel.getUserById(user_id);
      res.json({
        success: true,
        message: 'User data successfully updated',
        data: fetchUpdatedUserDataQuery,
      });
    } else {
      res.json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { user_id } = req.body;
    const data = await UserModel.getUserById(user_id);

    if (data) {
      res.json({
        message: 'GET User by ID success',
        data: data,
      });
    } else {
      res.status(404).json({
        message: 'User not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};
