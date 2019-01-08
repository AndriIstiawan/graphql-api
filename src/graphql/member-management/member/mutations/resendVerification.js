var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var MemberType = require('./../MemberType').MemberType;
var MemberModel = require('./../../../../models/member-management/member');
const transporter = require('./../../../../app/emailConfig').transporter;
const jsonwebtoken = require('jsonwebtoken');
var dateFormat = require('dateformat');
var bcrypt = require('bcrypt');

exports.resendVerification = {
    type: MemberType,
    args: {
        memberID:{
            type: GraphQLString,
        },
        email:{
            type: GraphQLString,
        },
        uriTarget:{
            type: GraphQLString,
        },
    },
    resolve: async (root, params) => {
        const now = new Date();
        
        //generate verification
        var verification = jsonwebtoken.sign({
            exp: Math.floor(Date.now() / 1000) + 10000000,
            status: 'resend verification'
            },process.env.SECRET_KEY || 'asdasd');

        //update member
        const member = await MemberModel.findOneAndUpdate({
            _id: params.memberID
        },{
            email: params.email,
            status: "not verified",
            verification: verification,
            updated_at: dateFormat(now, "yyyy-mm-dd H:MM:ss")
        })
        .then(result => {
            if(result){
                return result;
            }else{
                throw new Error("Email invalid");
            }
        })
        .catch(err => {
            throw new Error(err);
        });

        /*sending mail----------------------------------------------------------*/
        var mailOptions = {
            from: process.env.MAIL_USER || 'admin@fiture.id',
            to: params.email,
            subject: 'Verification Email',
            text:'',
            html:`
            <html>
                <head>
                    <style>
                        body{
                            margin: 20
                        }
                        p{
                            font-family: Arial, Helvetica, sans-serif
                        }
                    </style>
                </head>
                <body>
                    <img src="http://hoky.id/admin/img/site-logo.png" width=200 style="margin-top:20px; margin-bottom:20px"/>
                    <p>Welcome to Hoky!</p>
                    <p>Thank you for signing up. Please verify your email address by clicking the following link:</p>
                    <a href="`+params.uriTarget+``+verification+`">`+params.uriTarget+``+verification+`</a>
                    <p>Thank you.</p>
                </body>
            </html>
            `
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            throw new Error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
        /*sending mail----------------------------------------------------------*/

        return await MemberModel.findById(member.id).exec();
    }
}