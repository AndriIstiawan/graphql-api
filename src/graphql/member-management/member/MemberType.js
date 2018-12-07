var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLList = require('graphql').GraphQLList;
var LevelType = require('./../level/LevelType').LevelType;

var AddressType = new GraphQLObjectType({
    name: 'address',
    fields: function () {
        return {
            address_alias: {
                type: GraphQLString
            },
            receiver_name: {
                type: GraphQLString
            },
            phone_number: {
                type: GraphQLString
            },
            address: {
                type: GraphQLString
            },
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
            primary: {
                type: GraphQLBoolean
            },
        }
    }
});

var SosmedType = new GraphQLObjectType({
    name: 'social_media',
    fields: function () {
        return {
            status: {
                type: GraphQLBoolean
            },
            sosmed: {
                type: GraphQLString
            }
        }
    }
});

var BussinessType = new GraphQLObjectType({
    name: 'bussinessAttr',
    fields: function () {
        return {
            business: {
                type: GraphQLString
            },
            department: {
                type: GraphQLString
            },
            businesstype: {
                type: GraphQLString
            },
            totalemployee: {
                type: GraphQLString
            },
        }
    }
});

var TypeType = new GraphQLObjectType({
    name: 'memberType',
    fields: function () {
        return {
            type: {
                type: GraphQLString
            },
            businessattr: {
                type: new GraphQLList(BussinessType)
            }
        }
    }
});

// User Type
exports.MemberType = new GraphQLObjectType({
    name: 'member',
    fields: function () {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            image_url: {
                type: GraphQLString
            },
            firebase_token: {
                type: GraphQLString
            },
            name: {
                type: GraphQLString
            },
            email: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            },
            phone: {
                type: GraphQLString
            },
            point: {
                type: GraphQLInt
            },
            status: {
                type: GraphQLString
            },
            dompet: {
                type: GraphQLInt
            },
            koin: {
                type: GraphQLInt
            },
            type: {
                type: new GraphQLList(TypeType)
            },
            social_media: {
                type: new GraphQLList(SosmedType)
            },
            level: {
                type: new GraphQLList(LevelType),
                resolve(parent, args) {
                    parent.level.map(obj => {
                        return obj.id = obj._id;
                    });
                    return parent.level;
                }
            },
            address: {
                type: new GraphQLList(AddressType)
            },
            verification: {
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

exports.AddressType = AddressType;