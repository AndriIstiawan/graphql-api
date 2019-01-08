var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var MemberType = require('./../MemberType').MemberType;
var MemberModel = require('./../../../../models/member-management/member');

exports.addFirebaseToken = {
    type: MemberType,
    args: {
        memberID: {
            type: GraphQLString,
        },
        firebase_token: {
            type: GraphQLString,
        },
    },
    resolve: async (root, params) => {
        const updateMember = await MemberModel.findOneAndUpdate({
            _id: params.memberID
        }, {
            "firebase_token": params.firebase_token
        });
        return await MemberModel.findById(params.memberID).exec();
    }
}