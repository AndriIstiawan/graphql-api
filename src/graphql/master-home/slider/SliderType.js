var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;

// Level Type
exports.SliderType = new GraphQLObjectType({
  name: 'slider',
  fields: function () {
    return {
      id: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: GraphQLString },
      image: { type: GraphQLString },
      redirect: { type: GraphQLBoolean },
      url: { type: GraphQLString }
    }
  }
});
