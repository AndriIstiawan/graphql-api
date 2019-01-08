var GraphQLList = require('graphql').GraphQLList;
var PaymentMethodType = require('./PaymentMethodType').PaymentMethodType;
var PaymentMethodModel = require('./../../../models/payment-management/payment-method');

//view all payment method
exports.PaymentMethods = {
    type: new GraphQLList(PaymentMethodType),
    resolve: function () {
        const paymentMethods = PaymentMethodModel.find({
            "deleted_at": null
        }).exec()
        if (!paymentMethods) {
            throw new Error('Error')
        }
        return paymentMethods;
    }
}