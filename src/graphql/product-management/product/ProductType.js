var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLFloat = require('graphql').GraphQLFloat;
var GraphQLList = require('graphql').GraphQLList;
var CategoryType = require('./../category/CategoryType').CategoryType;
var DiscountType = require('./../../master-deal/discount/DiscountType').discountType;

var WeightType = new GraphQLObjectType({
    name: 'weight',
    fields: function () {
        return {
            unit: {
                type: GraphQLString
            },
            weight: {
                type: GraphQLInt
            }
        }
    }
});

var ImageType = new GraphQLObjectType({
    name: 'image',
    fields: function () {
        return {
            filename: {
                type: GraphQLString
            },
            size: {
                type: GraphQLInt
            }
        }
    }
});

var PriceType = new GraphQLObjectType({
    name: 'price',
    fields: function () {
        return {
            min: {
                type: GraphQLFloat
            },
            max: {
                type: GraphQLFloat
            }
        }
    }
});

var VariantType = new GraphQLObjectType({
    name: 'variant',
    fields: function () {
        return {
            key: {
                type: GraphQLString
            },
            image: {
                type: GraphQLString
            },
            price: {
                type: GraphQLFloat
            },
            sku: {
                type: GraphQLString
            },
            varStock: {
                type: GraphQLInt
            }
        }
    }
});

// User Type
exports.ProductType = new GraphQLObjectType({
    name: 'product',
    fields: function () {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            name: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            weight: {
                type: new GraphQLList(WeightType)
            },
            stock: {
                type: GraphQLInt
            },
            sku: {
                type: GraphQLString
            },
            created_at: {
                type: GraphQLString
            },
            updated_at: {
                type: GraphQLString
            },
            image: {
                type: new GraphQLList(ImageType)
            },
            price: {
                type: new GraphQLList(PriceType)
            },
            variant: {
                type: new GraphQLList(VariantType)
            },
            categories: {
                type: new GraphQLList(CategoryType),
                resolve(parent, args) {
                    parent.categories.map( obj =>{
                        return obj.id = obj._id;
                    });
                    return parent.categories;
                }
            },
            discounts: {
                type: new GraphQLList(DiscountType),
                resolve(parent, args) {
                    parent.discounts.map( obj =>{
                        return obj.id = obj._id;
                    });
                    return parent.discounts;
                }
            },
            discount_percent: {
                type: GraphQLFloat
            },
            discount_price: {
                type: GraphQLFloat
            },
        }
    }
});

// weight type export
exports.WeightType = WeightType;