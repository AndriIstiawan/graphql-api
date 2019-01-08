var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var InquryType = require('./InquryType');
var InquryModel = require('./../../../models/po-management/inquiry/inqury');
var mongoose = require('mongoose');

//get inquiry by id
exports.getInquiry = {
    type: InquryType.InquiryType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params) {
        const inquiry = InquryModel.findById(params.id).exec();
        if (!inquiry) {
            throw new Error('Error')
        }
        return inquiry;
    }
}

//get inquiry by id
exports.getInquiryByMemberID = {
    type: InquryType.InquiryType,
    args: {
        memberID: {
            type: new GraphQLNonNull(GraphQLString)
        },
    },
    resolve(root, params) {
        const inquiry = InquryModel.findOne({
            "member": {
                $elemMatch: {
                    "_id":mongoose.Types.ObjectId(params.memberID)
                }
            },
            "status": "Active",
        }).exec();
        return inquiry;
    }
}