var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLFloat = require('graphql').GraphQLFloat;
var InquiryType = require('./../InquryType');
var InquiryModel = require('./../../../../models/po-management/inquiry/inqury');
var OrdersModel = require('./../../../../models/order-management/orders');
var MemberModel = require('./../../../../models/member-management/member');
var dateFormat = require('dateformat');
var mongoose = require('mongoose');

//add member type
var MemberType = require('./../../../member-management/member/MemberType').MemberType;

exports.addInquiry = {
    type: InquiryType.InquiryType,
    args: {
        inquiryID: {
            type: GraphQLString,
        },
        IP: {
            type: GraphQLString,
        },
        memberID: {
            type: GraphQLString,
        },
        productID: {
            type: GraphQLString,
        },
        productImage: {
            type: GraphQLString,
        },
        productName: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        quantity: {
            type: GraphQLInt,
        },
        totalPriceInquiry: {
            type: GraphQLFloat,
        }
    },
    resolve: async (root, params) => {
        const now = new Date();
        var newID = "";
        if(params.productID){
            newID = mongoose.Types.ObjectId(params.productID);
        }else{
            newID = mongoose.Types.ObjectId();
        }

        const member = await MemberModel.find({
            "_id": params.memberID
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return [];
        });

        var product = [];
        if (params.productName) {
            product = {
                id: newID,
                productImage: params.productImage,
                productName: params.productName,
                description: params.description,
                quantity: params.quantity,
                price: 0,
                totalPrice: 0,
                status: [{
                    statusType: "Pending",
                    statusNote: ""
                }],
                created_at: dateFormat(now, "yyyy-mm-dd H:MM:ss"),
                updated_at: dateFormat(now, "yyyy-mm-dd H:MM:ss"),
            };
        }

        if (params.inquiryID) {
            const countInquiryProduct = await InquiryModel.findOneAndUpdate({
                _id: params.inquiryID
            }, {
                $pull: {
                    "inquiries": {
                        "id": newID
                    }
                }
            });
            const updateInquiryProduct = await InquiryModel.findOneAndUpdate({
                _id: params.inquiryID
            }, {
                IP: params.IP,
                member: member,
                total_price_inquiry: params.totalPriceInquiry,
                updated_at: dateFormat(now, "yyyy-mm-dd H:MM:ss"),
                $push: {
                    "inquiries": product
                }
            });
            const returnInquiries = await InquiryModel.findById(params.inquiryID).exec();
            const updateOrders = await OrdersModel.findOneAndUpdate({
                "inquiry": {
                    $elemMatch: {
                        "_id":mongoose.Types.ObjectId(params.inquiryID)
                    }
                }
            }, {
                inquiry: [returnInquiries]
            });

            return await returnInquiries;

        }else{
            const uModel = await new InquiryModel({
                IP: params.IP,
                member: member,
                total_price_inquiry: params.totalPriceInquiry,
                "inquiries": product,
                status: "Active",
                created_at: dateFormat(now, "yyyy-mm-dd H:MM:ss"),
                updated_at: dateFormat(now, "yyyy-mm-dd H:MM:ss")
            });
            const newInquiry = uModel.save();
            return await newInquiry;
        }
    }
}