var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLList = require('graphql').GraphQLList;
var Segment_attrType = require('./../segment-attr/Segment_attrType').Segment_attrType;

// Level Type
exports.SegmentType = new GraphQLObjectType({
  name: 'segment',
  fields: function () {
    return {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      slug: { type: GraphQLString },
      attr: {
          type: new GraphQLList(Segment_attrType)
      }
    }
 }
});
