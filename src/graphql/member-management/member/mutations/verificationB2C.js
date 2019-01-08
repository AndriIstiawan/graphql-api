var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var MemberType = require('./../MemberType').MemberType;
var MemberModel = require('./../../../../models/member-management/member');
var dateFormat = require('dateformat');
var bcrypt = require('bcrypt');

exports.verificationB2C = {
    type: MemberType,
    args: {
        verification:{
            type: GraphQLString,
        },
        password:{
            type: GraphQLString,
        },
    },
    resolve: async (root, params) => {
        const now = new Date();
        const password = await bcrypt.hash(params.password, 10).then(function(hash) {
            return hash;
        });

        //update member
        const member = await MemberModel.findOneAndUpdate({
            verification: params.verification
        },{
            password: password,
            type: [{
                type: "B2C"
            }],
            status: "on",
            updated_at: dateFormat(now, "yyyy-mm-dd H:MM:ss")
        })
        .then(result => {
            if(result){
                return result;
            }else{
                throw new Error("Verification token invalid");
            }
        })
        .catch(err => {
            throw new Error(err);
        });

        return await MemberModel.findById(member.id).exec();
    }
}