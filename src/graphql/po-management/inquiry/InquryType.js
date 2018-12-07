var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLFloat = require('graphql').GraphQLFloat;
var GraphQLList = require('graphql').GraphQLList;

//add member type
var MemberType = require('./../../member-management/member/MemberType').MemberType;

var StatusInquiryType = new GraphQLObjectType({
    name: 'statusInquiryType',
    fields: function () {
        return {
            statusType: {
                type: GraphQLString
            },
            statusNote: {
                type: GraphQLString
            },
        }
    }
});

var ProductInquiryType = new GraphQLObjectType({
    name: 'productInquiryType',
    fields: function () {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            productImage: {
                type: GraphQLString
            },
            productName: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            quantity: {
                type: GraphQLInt
            },
            price: {
                type: GraphQLFloat
            },
            totalPrice: {
                type: GraphQLFloat
            },
            status: {
                type: new GraphQLList(StatusInquiryType)
            },
            created_at: {
                type: GraphQLString
            },
            updated_at: {
                type: GraphQLString
            }
        }
    }
});

// Cart Type
exports.InquiryType = new GraphQLObjectType({
    name: 'inquiry',
    fields: function () {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            IP: {
                type: GraphQLString
            },
            member: {
                type: new GraphQLList(MemberType),
                resolve(parent, args) {
                    parent.member.map( obj =>{
                        return obj.id = obj._id;
                    });
                    return parent.member;
                }
            },
            inquiries: {
                type: new GraphQLList(ProductInquiryType)
            },
            total_price_cart: {
                type: GraphQLFloat
            },
            status: {
                type: GraphQLString
            },
            created_at: {
                type: GraphQLString
            },
            updated_at: {
                type: GraphQLString
            }
        }
    }
});