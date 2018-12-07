var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLInt = require('graphql').GraphQLInt;

// User Type
exports.SettingType = new GraphQLObjectType({
  name: 'setting',
  fields: function () {
    return {
      id: { type: new GraphQLNonNull(GraphQLID) },
      logo: { type: GraphQLString },
      favicon: { type: GraphQLString },
      site_title: { type: GraphQLString },
      site_status: { type: GraphQLBoolean },
      phone_number: { type: GraphQLString },
      email_info: { type: GraphQLString },
      meta_title: { type: GraphQLString },
      meta_description: { type: GraphQLString },
      order_expire: { type: GraphQLInt },
      transaction_price: { type: GraphQLInt },
      transaction_point: { type: GraphQLInt },
      member_log_expire: { type: GraphQLInt },
      created_at: { type: GraphQLString },
      updated_at: { type: GraphQLString }
    }
  }
});
