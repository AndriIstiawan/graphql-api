var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var MemberType = require('./../MemberType').MemberType;
var MemberModel = require('./../../../../models/member-management/member');
var RajaOngkir = require('./../../../../app/RajaOngkirConfig').RajaOngkir;

exports.addAddressMember = {
    type: MemberType,
    args: {
        memberID: {
            type: GraphQLString,
        },
        address_alias: {
            type: GraphQLString,
        },
        receiver_name: {
            type: GraphQLString,
        },
        phone_number: {
            type: GraphQLString,
        },
        address: {
            type: GraphQLString,
        },
        cityID: {
            type: GraphQLString
        },
        primary: {
            type: GraphQLBoolean,
        },
    },
    resolve: async (root, params) => {
        const location = await RajaOngkir.getCity(params.cityID).then(function (result){
            return result.rajaongkir.results;
            // console.log(JSON.stringify(result, null, 4));
        }).catch(function (error){
            return null;
        });

        var address = {
            "address_alias": params.address_alias,
            "receiver_name": params.receiver_name,
            "phone_number": params.phone_number,
            "address": params.address,
            "city_id": location.city_id,
            "province_id": location.province_id,
            "province": location.province,
            "type": location.type,
            "city_name": location.city_name,
            "postal_code": location.postal_code,
            "primary": params.primary,
        };
        if(params.primary){
            const addressList = await MemberModel.findById(params.memberID)
            .then(result => {
                for (let index = 0; index < result.address.length; index++) {
                    result.address[index].primary = false; 
                }
                return result.address
            });
            const updateAddress = await MemberModel.findOneAndUpdate({
                _id: params.memberID
            }, {
                "address": addressList
            });
        }

        const updateMember = await MemberModel.findOneAndUpdate({
            _id: params.memberID
        }, {
            $push: {
                "address": address
            }
        });
        return await MemberModel.findById(params.memberID).exec();
    }
}