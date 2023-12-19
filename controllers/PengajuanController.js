import * as PengajuanModel from "../models/PengajuanModel.js";

export const getAllPengajuan = async (req, res) => {
  try {
    const data = await PengajuanModel.getAllPengajuan();

    res.json({
      message: "GET All Pengajuan success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message || error,
    });
  }
};

export const createPengajuan = async (req, res) => {
  try {
    const { body, files } = req;
    console.log('Received login request - Request Body:', JSON.stringify(req.body));
    const fileKTPPath = files.fileKTP.path;
    const fileKKPath = files.fileKK.path;

    // Call the function in the model to save the pengajuan
    const result = await PengajuanModel.createPengajuan(body, fileKTPPath, fileKKPath);

    res.status(201).json({ message: 'Pengajuan created successfully', result });
  } catch (error) {
    console.error('Error creating pengajuan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPengajuanByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await PengajuanModel.getPengajuanByUserId(user_id);

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Data not found",
        data: null,
      });
    }

    res.json({
      message: "GET Pengajuan By User ID success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message || error,
    });
  }
};

export const updateProsesSuratPengantar = async (req, res) => {
  try {
    const pengajuan_id = req.params.pengajuan_id;
    const newProsesValue = req.body.proses; // Ambil nilai proses dari permintaan HTTP

    const result = await PengajuanModel.updateProsesSuratPengantar(
      pengajuan_id,
      newProsesValue
    );

    if (result.affectedRows > 0) {
      res.json({
        message: "Update Proses Surat Pengantar Success",
        data: result,
      });
    } else {
      res.status(404).json({
        message: "Data not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message || error,
    });
  }
};

// export const updateProsesSuratKeluarga = async (req, res) => {
//   try {
//     const pengajuan_id = req.params.pengajuan_id;
//     const newProsesValue = req.body.proses; // Ambil nilai proses dari permintaan HTTP

//     const result = await PengajuanModel.updateProsesSuratKeluarga(
//       pengajuan_id,
//       newProsesValue
//     );

//     if (result.affectedRows > 0) {
//       res.json({
//         message: "Update Proses Surat Pembuatan Keluarga Success",
//         data: result,
//       });
//     } else {
//       res.status(404).json({
//         message: "Data not found",
//         data: null,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Server Error",
//       serverMessage: error.message || error,
//     });
//   }
// };

export const updateProsesSuratKeluarga = async (req, res) => {
  try {
    const pengajuan_id = req.params.pengajuan_id;
    const newProsesValue = req.body.proses; // Ambil nilai proses dari permintaan HTTP

    const result = await PengajuanModel.updateProsesSuratKeluarga(
      pengajuan_id,
      newProsesValue
    );

    if (result.affectedRows > 0) {
      res.json({
        message: "Update Proses Surat Pembuatan Keluarga Success",
        data: result,
      });
    } else {
      res.status(404).json({
        message: "Data not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message || error,
    });
  }
};

export const updateProsesSuratTidakMampu = async (req, res) => {
  try {
    const pengajuan_id = req.params.pengajuan_id;
    const newProsesValue = req.body.proses; // Ambil nilai proses dari permintaan HTTP

    const result = await PengajuanModel.updateProsesSuratTidakMampu(
      pengajuan_id,
      newProsesValue
    );

    if (result.affectedRows > 0) {
      res.json({
        message: "Update Proses Surat Keterangan Tidak Mampu Success",
        data: result,
      });
    } else {
      res.status(404).json({
        message: "Data not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message || error,
    });
  }
};