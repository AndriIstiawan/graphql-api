var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;

var CategoryType = require('./CategoryType').CategoryType;
var CategoryArrayType = require('./CategoryType').CategoryArrayType;
var CategoryModel = require('./../../../models/product-management/category');

//view all categories
exports.Categories = {
    type: new GraphQLList(CategoryType),
    resolve: function () {
        const categories = CategoryModel.find({
            "deleted_at": null,
        }).exec();
        if (!categories) {
            throw new Error('Error')
        }
        return categories;
    }
}

//get category by slug
exports.getCategory = {
    type: CategoryType,
    args: {
        slug: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params) {
        const category = CategoryModel.findOne({
            "slug": params.slug,
            "deleted_at": null,
        }).exec();
        if (!category) {
            throw new Error('Error')
        }
        return category;
    }
}

//getCategoryList
exports.getCategoryList = {
    type: new GraphQLList(CategoryArrayType),
    resolve: async () => {
        const allCategories = CategoryModel.find().exec()
        var categories = await CategoryModel.find({
                "parent": {
                    $eq: []
                },
                "deleted_at": null,
            })
            .then(result => {
                return result;
            })
            .catch(err => {
                return [];
            });

        var prodName = await categories.map(async (obj) => {
            var childs = await CategoryModel.find({
                    "parent": {
                        $elemMatch: {
                            "slug": obj.slug
                        }
                    },
                    "deleted_at": null,
                })
                .then(result => {
                    return result;
                })
                .catch(err => {
                    return [];
                });
            var data = {
                name: obj.name,
                slug: obj.slug,
                childs: childs
            };
            return await data;
        });

        if (!prodName) {
            throw new Error('Error')
        }
        return await prodName;
    }
}