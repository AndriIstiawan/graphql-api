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
var AddressType = require('./../../member-management/member/MemberType').AddressType;
//add product type
var DiscountType = require('./../../master-deal/discount/DiscountType').discountType;
var WeightType = require('./../../product-management/product/ProductType').WeightType;
//add promo type
var PromoType = require('./../../master-deal/promo/PromoType').PromoType;
//add courier ext
var CourierExtType = require('./../../deliveries-management/raja-ongkir/CourierExtType').CourierExtType;

//weight product cart
var WeightProductCart = new GraphQLObjectType({
    name: 'weightProductCart',
    fields: function () {
        return {
            weight: {
                type: GraphQLFloat
            },
            unit: {
                type: GraphQLString
            },
            total_weight: {
                type: GraphQLFloat
            }
        }
    }
});

//products cart
var ProductCartType = new GraphQLObjectType({
    name: 'productCartType',
    fields: function () {
        return {
            product_id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            image: {
                type: GraphQLString
            },
            product_name: {
                type: GraphQLString
            },
            variant: {
                type: GraphQLString
            },
            sku: {
                type: GraphQLString
            },
            weight: {
                type: new GraphQLList(WeightProductCart)
            },
            quantity: {
                type: GraphQLInt
            },
            price_netto: {
                type: GraphQLFloat
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
            promo: {
                type: new GraphQLList(PromoType)
            },
            price_gross: {
                type: GraphQLFloat
            },
            total_price: {
                type: GraphQLFloat
            },
            updated_at: {
                type: GraphQLString
            },
        }
    }
});

//total price cart
var TotalPriceCartType = new GraphQLObjectType({
    name: 'totalPriceCartType',
    fields: function () {
        return {
            total_product: {
                type: GraphQLFloat
            },
            courier_cost: {
                type: GraphQLFloat
            },
            courier_cut_promo: {
                type: GraphQLFloat
            },
            total: {
                type: GraphQLFloat
            },
            total_cut_promo: {
                type: GraphQLFloat
            },
            currency: {
                type: GraphQLString
            }
        }
    }
});

// Cart Type
exports.CartType = new GraphQLObjectType({
    name: 'cart',
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
            products: {
                type: new GraphQLList(ProductCartType),
                resolve(parent, args) {
                    parent.products.map( obj =>{
                        return obj.id = obj._id;
                    });
                    return parent.products;
                }
            },
            total_price: {
                type: new GraphQLList(TotalPriceCartType)
            },
            total_weight: {
                type: new GraphQLList(WeightType)
            },
            address: {
                type: new GraphQLList(AddressType)
            },
            note: {
                type: GraphQLString
            },
            courier: {
                type: new GraphQLList(CourierExtType)
            },
            midtrans_token: {
                type: GraphQLString
            },
            payment_status: {
                type: GraphQLBoolean
            },
            promo: {
                type: new GraphQLList(PromoType)
            },
            promo_used: {
                type: GraphQLBoolean
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