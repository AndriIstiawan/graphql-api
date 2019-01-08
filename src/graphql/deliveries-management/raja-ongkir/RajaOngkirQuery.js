var GraphQLString = require('graphql').GraphQLString;
var GraphQLFloat = require('graphql').GraphQLFloat;
var GraphQLList = require('graphql').GraphQLList;
var ProvinceType = require('./ProvinceType').ProvinceType;
var CityType = require('./CityType').CityType;
var CourierExtType = require('./CourierExtType').CourierExtType;
var ServiceExtType = require('./CourierExtType').ServiceExtType;
var RajaOngkir = require('./../../../app/RajaOngkirConfig').RajaOngkir;

//view all province
exports.Provinces = {
    type: new GraphQLList(ProvinceType),
    resolve: async () => {
        const provinces = await RajaOngkir.getProvinces().then(function (result) {
            return result.rajaongkir.results;
            // console.log(JSON.stringify(result, null, 4));
        }).catch(function (error) {
            return null;
        });

        return provinces;
    }
}

//view all cities
exports.Cities = {
    type: new GraphQLList(CityType),
    resolve: async () => {
        const cities = await RajaOngkir.getCities().then(function (result) {
            return result.rajaongkir.results;
            // console.log(JSON.stringify(result, null, 4));
        }).catch(function (error) {
            return null;
        });

        return cities;
    }
}

//get city by province id
exports.getCityByProvinceID = {
    type: new GraphQLList(CityType),
    args: {
        provinceID: {
            type: GraphQLString,
        },
    },
    resolve: async (root, params) => {
        const cities = await RajaOngkir.getCities().then(function (result) {
            return result.rajaongkir.results.filter(function (result) {
                return result.province_id == params.provinceID;
            });
            // console.log(JSON.stringify(result, null, 4));
        }).catch(function (error) {
            return null;
        });

        return cities;
    }
}

//get list courier
// exports.CourierExt = {
//     type: new GraphQLList(CourierExtType),
//     resolve: async () => {
//         var couriers = [];
//         var params = {
//             origin: 151, // ID Kota atau Kabupaten Asal
//             destination: 152, // ID Kota atau Kabupaten Tujuan
//             weight: 1000 // Berat Barang dalam gram (gr)
//         };

//         //get JNE
//         var courier = await RajaOngkir.getJNECost(params).then(function (result) {
//             return result.rajaongkir.results[0];
//         }).catch(function (error) {
//             return null;
//         });
//         couriers.push(courier);

//         //get TIKI
//         var courier = await RajaOngkir.getTIKICost(params).then(function (result) {
//             return result.rajaongkir.results[0];
//         }).catch(function (error) {
//             return null;
//         });
//         couriers.push(courier);

//         //get POS
//         var courier = await RajaOngkir.getPOSCost(params).then(function (result) {
//             return result.rajaongkir.results[0];
//         }).catch(function (error) {
//             return null;
//         });
//         couriers.push(courier);

//         return couriers;
//     }
// }

//get cost delivery
exports.getCostDelivery = {
    type: CourierExtType,
    args: {
        origin: {
            type: GraphQLString,
        },
        destination: {
            type: GraphQLString,
        },
        weight: {
            type: GraphQLFloat,
        },
        courier: {
            type: GraphQLString,
        },
    },
    resolve: async (root, params) => {
        var parameter = {
            origin: params.origin, // ID Kota atau Kabupaten Asal
            destination: params.destination, // ID Kota atau Kabupaten Tujuan
            weight: params.weight // Berat Barang dalam gram (gr)
        };
        
        var CourierExt = {};
        switch(params.courier){
            case "tiki":
                CourierExt = await RajaOngkir.getTIKICost(parameter).then(function (result) {
                    return result.rajaongkir.results[0];
                }).catch(function (error) {
                    return null;
                });
            break;
            case "pos":
                CourierExt = await RajaOngkir.getPOSCost(parameter).then(function (result) {
                    return result.rajaongkir.results[0];
                }).catch(function (error) {
                    return null;
                });
            break;
            default:
                CourierExt = await RajaOngkir.getJNECost(parameter).then(function (result) {
                    return result.rajaongkir.results[0];
                }).catch(function (error) {
                    return null;
                });
            break;
        }

        return CourierExt;
    }
}