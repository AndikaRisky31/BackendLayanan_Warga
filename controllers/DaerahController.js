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

  export const getKabupatenByProvinsi = async (req, res) => {
    try {
      const provinsi_id = req.params.provinsi_id;
      const data = await daerahModel.getKabupatenByProvinsi(provinsi_id);
  
      res.json({
        message: 'GET Kabupaten By Provinsi success',
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  };

  export const getKecamatanByKabupaten = async (req, res) => {
    try {
      const kabupaten_id = req.params.kabupaten_id;
      const data = await daerahModel.getKecamatanByKabupaten(kabupaten_id);
  
      res.json({
        message: 'GET Kecamanatan By Kabupaten success',
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  };

  export const getKelurahanByKecamatan = async (req, res) => {
    try {
      const kecamatan_id = req.params.kecamatan_id;
      const data = await daerahModel.getKecamatanByKabupaten(kecamatan_id);
  
      res.json({
        message: 'GET Kelurahan By Kecamatan success',
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  };

  export const createKelurahan = async (req, res) => {
    const { body } = req;
    const {kecamatan_id, kelurahanName} = req.body;
    console.log(req.body);
  
    if(!(kecamatan_id && kelurahanName)){
      return res.status(400).json({
        message: "format data yang anda masukkan salah!",
        data: body
      });
    }
  
    try {
      const [data] = await daerahModel.createKelurahan(body);
      res.status(201).json({
        success: true,
        message: 'Kelurahan created successfully',
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

  export const getKelurahan = async (req, res) => {
    try {
      const [data] = await daerahModel.getKelurahan();
  
      res.json({
        message: 'GET All Kelurahan Kelurahan success',
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  };