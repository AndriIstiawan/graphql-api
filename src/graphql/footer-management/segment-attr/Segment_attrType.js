var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;

// Level Type
exports.Segment_attrType = new GraphQLObjectType({
  name: 'segment_attr',
  fields: function () {
    return {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      slug: { type: GraphQLString },
      type: { type: GraphQLString },
      url: { type: GraphQLString },
      urlicon: { type: GraphQLString },
      icon: { type: GraphQLString },
      textArea: { type: GraphQLString },
      urlmedia: { type: GraphQLString }
    }
 }
});
