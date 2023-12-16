import * as adminKelurahanModel from '../models/AdminKelurahanModel.js';

export const getAdminKelurahanByKelurahan = async (req, res) => {
  try {
    const { kelurahan_id } = req.body;
    console.log('Received Admin Kelurahan request - Request Body:', JSON.stringify(req.body));

    const adminKelurahanData = await adminKelurahanModel.getAdminKelurahanByKelurahanId(kelurahan_id);

    res.json({
      message: 'GET Admin Kelurahan success',
      data: adminKelurahanData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

export const getAdminKelurahanById = async(req,res) =>{
  try{
    const{id} = req.body;
    console.log('Received Admin Kelurahan By Id request - Request Body:', JSON.stringify(req.body));

    const adminKelurahanData = await adminKelurahanModel.getAdminKelurahanById(id);
  
    res.json({
      message: 'GET Admin Kelurahan success',
      data: adminKelurahanData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
}
