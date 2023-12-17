import * as adminKelurahanModel from '../models/AdminKelurahanModel.js';

const getAdminKelurahanByKelurahan = async (req, res) => {
  try {
    const [data] = await adminKelurahanModel.getAdminKelurahanByKelurahan();
    // console.log('Received Admin Kelurahan request - Request Body:', JSON.stringify(kelurahan_id));
    // const adminKelurahanData = 

    res.json({
      message: 'GET All Admin Kelurahan success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

const getAdminKelurahanByKelurahanById = async (req, res) => {
  try {
    const { id } = req.params;
    const [data] = await adminKelurahanModel.getAdminKelurahanByKelurahanById(id);
    console.log(data);
    // console.log('Received Admin Kelurahan request - Request Body:', JSON.stringify(kelurahan_id));
    // const adminKelurahanData = 

    res.json({
      message: 'GET Admin Kelurahan success By Id',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

const createAdminKelurahanByKelurahan = async (req, res) => {
  const { body } = req;
  const {nama, password, pangkat, nomor, email, alamat, imageURL} = req.body;
  console.log(req.body);

  if(!(nama && password && pangkat && nomor && email && alamat && imageURL)){
    return res.status(400).json({
      message: "format data yang anda masukkan salah!",
      data: null
    });
  }
  
  try {
    await adminKelurahanModel.createAdminKelurahanByKelurahan(body);
    res.status(201).json({
      message: "Create Admin_Kelurahan Success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const updateAdminKelurahanByKelurahan = async (req, res) => {
  const { id } = req.params;
  const {body} = req;
  console.log(body);

  try {
    await adminKelurahanModel.getAdminKelurahanByKelurahanById(body, id);
    console.log(body);

    res.json({
      message: 'UPDATE Admin Kelurahan success',
      data: {
        id: id,...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

const deleteAdminKelurahanByKelurahan = async (req, res) => {
 const { id } = req.params;
 try {
  await adminKelurahanModel.deleteAdminKelurahanByKelurahan(id);
  res.json({
    message: 'DELETE Admin Kelurahan Success',
    data: 'data yang dihapus dengan id ke : ' + id,
  });
  console.log(id);
 } catch (error) {
  res.status(500).json({
    message: 'Server Error',
    serverMessage: error,
  });
 }
};

export {
  getAdminKelurahanByKelurahan,
  getAdminKelurahanByKelurahanById,
  createAdminKelurahanByKelurahan,
  updateAdminKelurahanByKelurahan,
  deleteAdminKelurahanByKelurahan
};
