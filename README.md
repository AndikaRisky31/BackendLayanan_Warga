jika sudah berhasil membuka api,diawal akan muncul tulisan
" API Works!! " yang menandakan API berhasil 

Endpoint API :
Article :
GET /api/articles || untuk mengecheck semua artciles
GET /api/articles/:id || untuk mengecheck article dengan id tertentu
POST /api/articles || untuk melakukan input data article 
PATCH /api/articles/:id || untuk mengubah article dengan id tertentu
DELETE /api/articles/:id || untuk menghapus article dengan id tertentu

User :
GET /api/users || untuk mengecheck semua user
GET /api/users/:id || untuk mengecheck user dengan id tertentu
GET /api/users/kel_id/:kelurahan_id || untuk mengecheck keseluruhan user yang berada di id kelurahan tertentu
POST /api/users/create || untuk melakukan input data user
PATCH /api/users/:id || untuk mengubah user dengan id tertentu
DELETE /api/users/:id || untuk menghapus user dengan id tertentu ( tidak disarankan )

Pengajuan :
GET /api/pengajuan || untuk mengecheck semua pengajuan
GET /api/pengajuan/user/:user_id || untuk mengecheck pengajuan berdasarkan user_id tertentu
GET /api/pengajuan/:id || untuk mengecheck pengajuan berdasarkan id pengajuan tertentu
POST /api/pengajuan/create || untuk melakukan input data pengajuan
PATCH /api/pengajuan/update/:id || untuk mengubah data pengajuan dengan id tertentu
DELETE /api/pengajuan/delete/:id || untuk menghapus data pengajuan dengan id tertentu ( tidak disarankan )

Admin Kelurahan :
GET /api/admin || untuk mengecheck semua data admin
GET /api/admin/:id || untuk mengecheck data admin berdasarkan id tertentu
POST /api/admin || untuk melakukan input data admin
PATCH /api/admin/:id || untuk mengubah data admin dengan id tertentu
DELETE /api/admin/:id || untuk menghapus data admin dengan id tertentu ( tidak disarankan )

Laporan :
GET /api/laporan || untuk mengecheck semua data laporan
GET /api/laporan/user/:user_id || untuk mengecheck data laporan dengan user_id tertentu
GET /api/laporan/ekonomi || untuk mengecheck semua data laporan yang berfokus hanya pada ekonomi
GET /api/laporan/keamanan || untuk mengecheck semua data laporan yang berfokus hanya pada keamanan
GET /api/laporan/lingkungan || untuk mengecheck semua data laporan yang berfokus hanya pada lingkungan
GET /api/laporan/kesehatan || untuk mengecheck semua data laporan yang berfokus hanya pada kesehatan
POST /api/laporan || untuk melakukan input data laporan

Daerah :
GET /api/daerah/kelurahan/all || untuk mengecheck data semua kelurahan
GET /api/daerah/provinsi/all || untuk mengecheck semua data provinsi
GET /api/daerah/kabupaten/:province_id || untuk mengecheck data kabupaten berdasarkan provinsi_id tertentu
GET /api/daerah/kecamatan/:regency_id || untuk mengecheck data kecamatan berdasarkan kabupaten_id tertentu
GET /api/daerah/kelurahan/:district_id || untuk mengecheck data kelurahan berdasarkan kecamatan_id tertentu
POST /api/daerah/kelurahan/create || untuk melakukan input data kelurahan
