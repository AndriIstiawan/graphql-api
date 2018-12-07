var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var MemberType = require('./../MemberType').MemberType;
var MemberModel = require('./../../../../models/member-management/member');
var dateFormat = require('dateformat');
var bcrypt = require('bcrypt');

exports.verificationB2B = {
    type: MemberType,
    args: {
        verification:{
            type: GraphQLString,
        },
        password:{
            type: GraphQLString,
        },
        businessName:{
            type: GraphQLString,
        },
        departementName:{
            type: GraphQLString,
        },
        businessType:{
            type: GraphQLString,
        },
        totalEmployee:{
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
                    type: "B2B",
                    businessattr: [{
                        business: params.businessName,
                        department: params.departementName,
                        businesstype: params.businessType,
                        totalemployee: params.totalEmployee,
                    }]
                },
                {
                    type: "B2C"
                }
            ],
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