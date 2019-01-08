var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLString = require('graphql').GraphQLString;

// City RO Type
exports.CityType = new GraphQLObjectType({
    name: 'ro_city',
    fields: function () {
        return {
            city_id: {
                type: GraphQLString
            },
            province_id: {
                type: GraphQLString
            },
            province: {
                type: GraphQLString
            },
            type: {
                type: GraphQLString
            },
            city_name: {
                type: GraphQLString
            },
            postal_code: {
                type: GraphQLString
            },
        }
    }
});