var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;

//import member
var MemberModel = require('./../models/member');
var MemberType = require('./member/MemberType').MemberType;

// Member
exports.memberType = new GraphQLObjectType({
    name: 'Member',
    fields: function () {
        return {
            members: {
                type: new GraphQLList(MemberType),
                resolve: function () {
                    const members = MemberModel.find().exec()
                    if (!members) {
                        throw new Error('Error')
                    }
                    return members
                }
            }
        }
    }
});