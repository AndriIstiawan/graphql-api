var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var MemberType = require('./MemberType').MemberType;
var AddressType = require('./MemberType').AddressType;
var MemberModel = require('./../../../models/member-management/member');

//get product by id
exports.getMember = {
    type: MemberType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params) {
        const member = MemberModel.findById(params.id).exec();
        if (!member) {
            throw new Error('Error')
        }
        return member;
    }
}

//get member by firebase_token
exports.getMemberByFirebaseToken = {
    type: MemberType,
    args: {
        firebase_token: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params) {
        const members = MemberModel.findOne({
            "firebase_token": params.firebase_token,
        }).exec();
        if (!members) {
            throw new Error('Error')
        }
        return members
    }
}

exports.members = {
    type: new GraphQLList(MemberType),
    resolve: function () {
        const members = MemberModel.find({
            "deleted_at": null,
        }).exec()
        if (!members) {
            throw new Error('Error')
        }
        return members
    }
};

exports.getAddressByMemberID = {
    type:new GraphQLList(AddressType),
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async (root, params) => {
        const member = await MemberModel.findById(params.id).exec();
        if (!member) {
            throw new Error('Error')
        }
        return await member.address;
    }
};