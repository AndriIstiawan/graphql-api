var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var MemberType = require('./../MemberType').MemberType;
var MemberModel = require('./../../../../models/member-management/member');
var LevelModel = require('./../../../../models/member-management/level');
var dateFormat = require('dateformat');
const jsonwebtoken = require('jsonwebtoken');
const transporter = require('./../../../../app/emailConfig').transporter;

exports.registerMember = {
    type: MemberType,
    args: {
        name: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        phone: {
            type: GraphQLString,
        },
        sosmed_status: {
            type: GraphQLBoolean,
        },
        sosmed_register: {
            type: GraphQLString,
        },
        regType: {
            type: GraphQLString,
        },
        uriTarget: {
            type: GraphQLString,
        }
    },
    resolve: async (root, params) => {
        const now = new Date();

        //find email
        await MemberModel.find({
                email: params.email
            })
            .then(result => {
                if (result.length) {
                    throw new Error('Email already use');
                }
            });

        var type = [{
                type: "B2B"
            },
            {
                type: "B2C"
            }
        ];

        if (params.regType == "B2C") {
            type = [{
                type: "B2C"
            }];
        }

        var social_media = [{
                status: params.sosmed_status,
                sosmed:params.sosmed_register
            }
        ];

        //generate verification
        var verification = jsonwebtoken.sign({
            exp: Math.floor(Date.now() / 1000) + 10000000,
            status: 'new member'
            },process.env.SECRET_KEY || 'asdasd');

        const Level = await LevelModel.find({order: {$gte: 0}}).limit(1).sort({ order: 1 }).exec();

        const uModel = await new MemberModel({
            image_url: 'http://hoky.id/admin/img/avatars/member.png',
            name: params.name,
            email: params.email,
            phone: params.phone,
            level: Level,
            social_media: social_media,
            status: "not verified",
            point: 0,
            dompet: 0,
            koin: 0,
            type: type,
            verification: verification,
            created_at: dateFormat(now, "yyyy-mm-dd H:MM:ss"),
            updated_at: dateFormat(now, "yyyy-mm-dd H:MM:ss")
        });

        const newMember = uModel.save();

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
                    <img src="http://103.82.241.18/admin/img/site-logo.png" width=200 style="margin-top:20px; margin-bottom:20px"/>
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
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
        /*sending mail----------------------------------------------------------*/
        return await newMember;
    }
}