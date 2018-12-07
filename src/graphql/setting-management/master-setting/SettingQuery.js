var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;

var SettingModel = require('./../../../models/setting-management/master-setting/setting');
var SettingType = require('./SettingType').SettingType;

exports.Settings = {
    type: new GraphQLList(SettingType),
    resolve: function () {
        const settings = SettingModel.find().exec()
        if (!settings) {
            throw new Error('Error')
        }
        return settings
    }
}