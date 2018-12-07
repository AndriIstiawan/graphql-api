var FooterType = require('./FooterType').FooterType;
var FooterModel = require('./../../../models/footer-management/footer');

//get product by id
exports.Footer = {
    type: FooterType,
    resolve() {
        const footer = FooterModel.findOne().exec();
        if (!footer) {
            throw new Error('Error')
        }
        return footer;
    }
}