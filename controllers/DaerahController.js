import * as daerahModel from '../models/DaerahModel.js';

export const getAllProvinsi = async (req, res) => {
    try {
      const data = await daerahModel.getAllProvinsi();
  
      res.json(
        data
      );
    } catch (error) {
      res.status(500).json({
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  };

export const getKabupatenByIdProvinsi = async (req, res) => {
try {
    const { province_id } = req.params;
    const data = await daerahModel.getKabupatenByIdProvinsi(province_id);

    res.json(data);
} catch (error) {
    res.status(500).json({
    message: 'Server Error',
    serverMessage: error.message || error,
    });
}
};
export const getKecamatanByIdKabupaten = async (req, res) => {
    try {
        const { regency_id } = req.params;
        const data = await daerahModel.getKecamatanByIdKabupaten(regency_id);
    
        res.json(data);
    } catch (error) {
        res.status(500).json({
        message: 'Server Error',
        serverMessage: error.message || error,
        });
    }
    };