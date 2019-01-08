var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLFloat = require('graphql').GraphQLFloat;
var GraphQLInt = require('graphql').GraphQLInt;

// Level Type
exports.LevelType = new GraphQLObjectType({
  name: 'level',
  fields: function () {
    return {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      point: { type: GraphQLInt },
      hutang: { type: GraphQLFloat }
    }
  }
});
