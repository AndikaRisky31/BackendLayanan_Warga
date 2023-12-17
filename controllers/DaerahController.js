import * as daerahModel from '../models/DaerahModel.js';

export const getAllProvinsi = async (req, res) => {
    try {
      const data = await daerahModel.getAllProvinsi();
  
      res.json({
        message: 'GET all Provinsi success',
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  };