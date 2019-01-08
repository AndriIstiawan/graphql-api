var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLFloat = require('graphql').GraphQLFloat;
var GraphQLList = require('graphql').GraphQLList;

//add member type
var MemberType = require('./../../member-management/member/MemberType').MemberType;
//add cart type
var CartType = require('./../../po-management/cart/CartType').CartType;
//add inquiry type
var InquiryType = require('./../../po-management/inquiry/InquryType').InquiryType;

// Orders Type
exports.OrdersType = new GraphQLObjectType({
    name: 'orders',
    fields: function () {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
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
            cart: {
                type: new GraphQLList(CartType),
                resolve(parent, args) {
                    parent.cart.map( obj =>{
                        return obj.id = obj._id;
                    });
                    return parent.cart;
                }
            },
            inquiry: {
                type: new GraphQLList(InquiryType),
                resolve(parent, args) {
                    parent.inquiry.map( obj =>{
                        return obj.id = obj._id;
                    });
                    return parent.inquiry;
                }
            },
            total_price: {
                type: GraphQLFloat
            },
            status: {
                type: GraphQLString
            },
            type: {
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