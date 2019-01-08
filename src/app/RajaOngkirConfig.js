/*raja ongkir setting setting----------------------------------------------------------*/
//https://github.com/andhikamaheva/rajaongkir-nodejs
/*
Dalam RajaOngkir Node.js terdapat 3 jenis API yang dapat digunakan yaitu Starter, Basic, dan Pro sesuai dengan dokumentasi RajaOngkir.com. 
Untuk menjalankan masing - masing API tersebut Anda dapat menggunakan perintah sebagai berikut : 
*/

/*
Tipe akun Starter memiliki beberapa fitur antara lain :

getProvinces() untuk menampilkan seluruh data Provinsi
getProvince(idProvinsi) untuk menampilkan data Provinsi berdasarkan ID / parameter ID
getCities() untuk menampilkan seluruh data Kota
getCity(idKota) untuk menampilkan data Kota berdasarkan ID / Parameter ID
getJNECost(params) untuk menampilkan biaya pengiriman Kurir JNE
getPOSCost(params) untuk menampilkan biaya pengiriman Kurir POS
getTIKICost(params) untuk menampilkan biaya pengiriman Kurir TIKI
*/
exports.RajaOngkir = require('rajaongkir-nodejs').Starter(process.env.RAJAONGKIR_API_KEY || 'fbf6a2ea2c51563bf9aae4f8ecdc5a1a');

/*
Tipe akun Basic memiliki beberapa fitur antara lain :

getProvinces() untuk menampilkan seluruh data Provinsi
getProvince(idProvinsi) untuk menampilkan data Provinsi berdasarkan ID / parameter ID
getCities() untuk menampilkan seluruh data Kota
getCity(idKota) untuk menampilkan data Kota berdasarkan ID / Parameter ID
getJNECost(params) untuk menampilkan biaya pengiriman Kurir JNE
getPOSCost(params) untuk menampilkan biaya pengiriman Kurir POS
getTIKICost(params) untuk menampilkan biaya pengiriman Kurir TIKI
getRPXCost(params) untuk menampilkan biaya pengiriman Kurir RPX
getESLCost(params) untuk menampilkan biaya pengiriman Kurir ESL
getPCPCost(params) untuk menampilkan biaya pengiriman Kurir PCP
getInterOrigins() untuk menampilkan data Kota (asal pengiriman) yang tersedia untuk pengiriman internasional
getInterOrigin(idKota) untuk menampilkan data Kota (asal pengiriman) yang tersedia untuk pengiriman internasional berdasarkan ID Kota/Kabupaten
getInterDests() untuk menampilkan data Negara yang mendukung pengiriman internasional
getInterDest(idNegara) untuk menampilkan data Negara yang mendukung pengiriman internasional berdasarkan ID Negara
getTIKIInterConst(params) untuk menampilkan biaya pengiriman internasional melalui kurir TIKI
getPOSInterCost(params) untuk menampilkan biaya pengiriman internasional melalui kurir POS
getCurrency() untuk menampilkan informasi nilai tukar rupiah terhadap US dollar
getJNEWaybill(params) untuk melacak / mengetahui status pengiriman berdasarkan nomor resi JNE
*/
// var RajaOngkir = require('rajaongkir-nodejs').Basic('apiKey');

/*
Tipe akun Basic memiliki beberapa fitur antara lain :

getProvinces() untuk menampilkan seluruh data Provinsi
getProvince(idProvinsi) untuk menampilkan data Provinsi berdasarkan ID / parameter ID
getCities() untuk menampilkan seluruh data Kota
getCity(idKota) untuk menampilkan data Kota berdasarkan ID / Parameter ID
getJNECost(params) untuk menampilkan biaya pengiriman Kurir JNE
getPOSCost(params) untuk menampilkan biaya pengiriman Kurir POS
getTIKICost(params) untuk menampilkan biaya pengiriman Kurir TIKI
getRPXCost(params) untuk menampilkan biaya pengiriman Kurir RPX
getESLCost(params) untuk menampilkan biaya pengiriman Kurir ESL
getPCPCost(params) untuk menampilkan biaya pengiriman Kurir PCP
getInterOrigins() untuk menampilkan data Kota (asal pengiriman) yang tersedia untuk pengiriman internasional
getInterOrigin(idKota) untuk menampilkan data Kota (asal pengiriman) yang tersedia untuk pengiriman internasional berdasarkan ID Kota/Kabupaten
getInterDests() untuk menampilkan data Negara yang mendukung pengiriman internasional
getInterDest(idNegara) untuk menampilkan data Negara yang mendukung pengiriman internasional berdasarkan ID Negara
getTIKIInterConst(params) untuk menampilkan biaya pengiriman internasional melalui kurir TIKI
getPOSInterCost(params) untuk menampilkan biaya pengiriman internasional melalui kurir POS
getCurrency() untuk menampilkan informasi nilai tukar rupiah terhadap US dollar
getJNEWaybill(params) untuk melacak / mengetahui status pengiriman berdasarkan nomor resi JNE
*/
// var RajaOngkir = require('rajaongkir-nodejs').Pro('apiKey');

/*mail setting----------------------------------------------------------*/