var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLList = require('graphql').GraphQLList;

var ParentType = new GraphQLObjectType({
    name: 'parent',
    fields: function () {
        return {
            id: {
                type: GraphQLID
            },
            name: {
                type: GraphQLString
            },
            slug: {
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

// Category Type
exports.CategoryType = new GraphQLObjectType({
    name: 'category',
    fields: function () {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLString)
            },
            name: {
                type: GraphQLString
            },
            slug: {
                type: GraphQLString
            },
            parent: {
                type: new GraphQLList(ParentType),
                resolve(parent, args) {
                    parent.parent.map( obj =>{
                        return obj.id = obj._id;
                    });
                    return parent.parent;
                }
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

//Child Array Type
var ChildArrayType = new GraphQLObjectType({
    name: 'childs',
    fields: function () {
        return {
            name: {
                type: GraphQLString
            },
            slug: {
                type: GraphQLString
            },
        }
    }
});

//Child Array Type
exports.CategoryArrayType = new GraphQLObjectType({
    name: 'categoryArray',
    fields: function () {
        return {
            name: {
                type: GraphQLString
            },
            slug: {
                type: GraphQLString
            },
            childs: {
                type: new GraphQLList(ChildArrayType)
            },
        }
    }
});