var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var MemberType = require('./../MemberType').MemberType;
var MemberModel = require('./../../../../models/member-management/member');

exports.setAddressPrimary = {
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

        const addressList = await MemberModel.findById(params.memberID)
        .then(result => {
            for (let index = 0; index < result.address.length; index++) {
                if(params.position_index == index){
                    result.address[index].primary = true;
                }else{
                    result.address[index].primary = false;
                }
            }
            return result.address
        });
        var updateAddress = await MemberModel.findOneAndUpdate({
            _id: params.memberID
        }, {
            "address": addressList
        });

        return await MemberModel.findById(params.memberID).exec();
    }
}