var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLString = require('graphql').GraphQLString;

// Level Type
exports.ProvinceType = new GraphQLObjectType({
    name: 'ro_province',
    fields: function () {
        return {
            province_id: {
                type: GraphQLString
            },
            province: {
                type: GraphQLString
            },
        }
    }
});