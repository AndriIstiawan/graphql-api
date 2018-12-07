var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var MemberType = require('./../MemberType').MemberType;
var MemberModel = require('./../../../../models/member-management/member');

exports.deleteAddressMember = {
    type: MemberType,
    args: {
        memberID: {
            type: GraphQLString,
        },
        position_index: {
            type: GraphQLInt,
        },
    },
    resolve: async (root, params) => {
        var primary = false;

        const addressList = await MemberModel.findById(params.memberID)
        .then(result => {
            var addr = [];
            if(result.address[params.position_index]){
                primary = result.address[params.position_index].primary;
                for (let index = 0; index < result.address.length; index++) {
                    if(params.position_index != index){
                        addr.push(result.address[index]);
                    }
                }
            }
            return addr
        });
        
        if(primary && addressList[0]){
            addressList[0].primary = true;
        }
        var updateAddress = await MemberModel.findOneAndUpdate({
            _id: params.memberID
        }, {
            "address": addressList
        });

        return await MemberModel.findById(params.memberID).exec();
    }
}