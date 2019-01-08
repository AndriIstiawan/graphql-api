var GraphQLString = require('graphql').GraphQLString;
var GraphQLFloat = require('graphql').GraphQLFloat;
var InquiryType = require('./../InquryType');
var InquiryModel = require('./../../../../models/po-management/inquiry/inqury');
var MemberModel = require('./../../../../models/member-management/member');
var OrdersModel = require('./../../../../models/order-management/orders');
var dateFormat = require('dateformat');
var mongoose = require('mongoose');

exports.removeFromInquiry = {
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

        const updateInquiryProduct = await InquiryModel.findOneAndUpdate({
            _id: params.inquiryID
        }, {
            IP: params.IP,
            member: member,
            total_price_inquiry: params.totalPriceInquiry,
            updated_at: dateFormat(now, "yyyy-mm-dd H:MM:ss"),
            $pull: {
                "inquiries": {
                    "id": newID
                }
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
    }
}