import * as LaporanModel from "../models/LaporanModel.js";

export const createLaporan = async (req, res) => {
  try {
    const { body, files } = req;
    console.log('Received report request - Request Body:', JSON.stringify(req.body));
    
    const { user_id, lokasi_laporan, jenis_laporan, deskripsi } = body;
    const fileLaporPath = files.bukti.path; // Adjust the key if needed

    if (!(user_id && fileLaporPath && lokasi_laporan && jenis_laporan && deskripsi)) {
      return res.status(400).json({
        message: "Bad Request",
        serverMessage: "Incomplete data",
      });
    }

    const result = await LaporanModel.createLaporan(body, fileLaporPath);

    res.status(201).json({
      success: true,
      message: 'Laporan created successfully',
      result
    });
  } catch (error) {
    console.error('Error creating laporan:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

export const getAllLaporan = async (req, res) => {
  try {
    const data = await LaporanModel.getAllLaporan();
    console.log(data);
    res.json({
      message: "GET all Users success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message || error,
    });
  }
};

export const getLaporanByUserId = async (req, res) => {
    try {
      const { user_id } = req.params;
      const data = await LaporanModel.getLaporanByUserId(user_id);
  
      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "Data not found",
          data: null,
        });
      }
  
      res.json({
        message: "GET Laporan By User ID success",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        serverMessage: error.message || error,
      });
    }
  };

  export const getEkonomiLaporan = async (req, res) => {
    try {
      const data = await LaporanModel.getEkonomiLaporan();
      
      res.json({
        success: true,
        message: 'Data Ekonomi Laporan ditemukan',
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  };

  export const getKeamananLaporan = async (req, res) => {
    try {
      const data = await LaporanModel.getKeamananLaporan();
      
      res.json({
        success: true,
        message: 'Data Keamanan Laporan ditemukan',
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  };

  export const getLingkunganLaporan = async (req, res) => {
    try {
      const data = await LaporanModel.getLingkunganLaporan();
      
      res.json({
        success: true,
        message: 'Data Lingkungan Laporan ditemukan',
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  };

  export const getKesehatanLaporan = async (req, res) => {
    try {
      const data = await LaporanModel.getKesehatanLaporan();
      
      res.json({
        success: true,
        message: 'Data Kesehatan Laporan ditemukan',
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  };
  
  
