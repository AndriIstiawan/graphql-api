var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var MemberType = require('./../MemberType').MemberType;
var MemberModel = require('./../../../../models/member-management/member');
var dateFormat = require('dateformat');
var bcrypt = require('bcrypt');

exports.loginMember = {
    type: MemberType,
    args: {
        email: {
            type: GraphQLString,
        },
        password: {
            type: GraphQLString,
        },
        loginType: {
            type: GraphQLString,
        }
    },
    resolve: async (root, params) => {
        const member = await MemberModel.findOne({
            email: params.email
        }).then(result => {
            return result;
        });

        //login with firebase
        if(params.password == ""){
            if(member.social_media[0].status){
                return await member;
            }else{
                throw new Error('Sign In with sosmed failed.');
            }
        }

        if(member.password == undefined){
            if(member.social_media[0].status){
                throw new Error('Please login with sosmed.');
            }else{
                throw new Error('Member not verified.');
            }
        }else{
            var hash = member.password;
            hash = hash.replace("$2y", '$2b');
            var matchPass = bcrypt.compareSync(params.password, hash);

            if(matchPass){
                if(member.status == 'not verified'){
                    throw new Error('Member not verified.');
                }else{
                    if(params.loginType == 'B2B'){
                        if(member.type[0].businessattr){
                            return await member;
                        }else{
                            throw new Error('Member not register in B2B.');
                        }
                    }else{
                        return await member;
                    }
                }
            }else if(member.social_media[0].status){
                throw new Error('Please login with sosmed.');
            }else if(member.status == 'not verified'){
                throw new Error('Member not verified.');
            }else{
                throw new Error('Login Failed.');
            }
        }

    }
}