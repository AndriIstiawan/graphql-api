var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var DiscountType = require('./DiscountType').discountType;
var DiscountModel = require('./../../../models/master-deal/discount');

//view all promo
exports.Discounts = {
    type: new GraphQLList(DiscountType),
    resolve: function () {
        const discounts = DiscountModel.find({
            "deleted_at": null
        }).exec()
        if (!discounts) {
            throw new Error('Error')
        }
        return discounts;
    }
}