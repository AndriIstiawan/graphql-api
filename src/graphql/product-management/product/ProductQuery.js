var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLList = require('graphql').GraphQLList;
var ProductType = require('./ProductType').ProductType;
var ProductModel = require('./../../../models/product-management/product');
var mongoose = require('mongoose');

//view all product
exports.Products = {
    type: new GraphQLList(ProductType),
    resolve: function () {
        const products = ProductModel.find({
            "deleted_at": null,
        }).exec();
        if (!products) {
            throw new Error('Error')
        }
        return products
    }
}

//get product by id
exports.getProduct = {
    type: ProductType,
    args: {
        ID: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params) {
        const product = ProductModel.findOne({
            "_id" : params.ID,
            "deleted_at": null,
        }).exec();
        if (!product) {
            throw new Error('Error')
        }

        return product;
    }
}

//get product by brand
exports.getProductByBrand = {
    type: new GraphQLList(ProductType),
    args: {
        brandID: {
            type: GraphQLString
        },
        brandKey: {
            type: GraphQLString
        },
        offset: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        limit: {
            type: new GraphQLNonNull(GraphQLInt)
        },
    },
    resolve: async (root, params) => {
        if(params.brandID != ""){
            var query = ProductModel.find({
                "brand": {
                    $elemMatch: {
                        "_id":mongoose.Types.ObjectId(params.brandID)
                    }
                },
                "deleted_at": null,
            }).skip(params.offset).limit(params.limit);
        }else{
            var query = ProductModel.find({
                "brand": {
                    $elemMatch: {
                        "slug":params.brandKey
                    }
                },
                "deleted_at": null,
            }).skip(params.offset).limit(params.limit);
        }

        var products = await query.exec();
        return products
    }
}

//get product by category
exports.getProductByCategory = {
    type: new GraphQLList(ProductType),
    args: {
        categoryID: {
            type: GraphQLString
        },
        categoryKey: {
            type: GraphQLString
        },
        offset: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        limit: {
            type: new GraphQLNonNull(GraphQLInt)
        },
    },
    resolve: async (root, params) => {
        if(params.categoryID != ""){
            var query = ProductModel.find({
                "categories": {
                    $elemMatch: {
                        "_id":mongoose.Types.ObjectId(params.categoryID)
                    }
                },
                "deleted_at": null,
            }).skip(params.offset).limit(params.limit);
        }else{
            var query = ProductModel.find({
                "categories": {
                    $elemMatch: {
                        "slug":params.categoryKey
                    }
                },
                "deleted_at": null,
            }).skip(params.offset).limit(params.limit);
        }

        var products = await query.exec();
        return products
    }
}