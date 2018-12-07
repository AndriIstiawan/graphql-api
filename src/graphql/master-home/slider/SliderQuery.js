var GraphQLList = require('graphql').GraphQLList;
var SliderType = require('./SliderType').SliderType;
var SliderModel = require('./../../../models/master-home/slider');

//view all categories
exports.Sliders = {
    type: new GraphQLList(SliderType),
    resolve: function () {
        const sliders = SliderModel.find({
            "deleted_at": null
        }).exec()
        if (!sliders) {
            throw new Error('Error')
        }
        return sliders;
    }
}