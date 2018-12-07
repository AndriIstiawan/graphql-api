var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;

//import setting
var Settings = require('./setting-management/master-setting/SettingQuery').Settings;

//import footer-management
var Footer = require('./footer-management/footer/FooterQuery').Footer;

//master home
var Sliders = require('./master-home/slider/SliderQuery').Sliders;

//master-deal
var Discounts = require('./master-deal/discount/DiscountQuery').Discounts;
var Promos = require('./master-deal/promo/PromoQuery').Promos;
var getPromoByID = require('./master-deal/promo/PromoQuery').getPromoByID;
var getPromoByMemberID = require('./master-deal/promo/PromoQuery').getPromoByMemberID;

//import product-management
var Products = require('./product-management/product/ProductQuery').Products;
var getProduct = require('./product-management/product/ProductQuery').getProduct;
var getProductByBrand = require('./product-management/product/ProductQuery').getProductByBrand;
var getProductByCategory = require('./product-management/product/ProductQuery').getProductByCategory;
var Categories = require('./product-management/category/CategoryQuery').Categories;
var getCategory = require('./product-management/category/CategoryQuery').getCategory;
var getCategoryList = require('./product-management/category/CategoryQuery').getCategoryList;

//import member-management
var members = require('./member-management/member/MemberQuery').members;
var getMember = require('./member-management/member/MemberQuery').getMember;
var getMemberByFirebaseToken = require('./member-management/member/MemberQuery').getMemberByFirebaseToken;
var getAddressByMemberID = require('./member-management/member/MemberQuery').getAddressByMemberID;
var LevelModel = require('./../models/member-management/level');
var LevelType = require('./member-management/level/LevelType').LevelType;

//import deliveries-management
var Couriers = require('./deliveries-management/courier/CourierQuery').Couriers;
/*raja ongkir*/
var Provinces = require('./deliveries-management/raja-ongkir/RajaOngkirQuery').Provinces;
var Cities = require('./deliveries-management/raja-ongkir/RajaOngkirQuery').Cities;
var getCityByProvinceID = require('./deliveries-management/raja-ongkir/RajaOngkirQuery').getCityByProvinceID;
var getCostDelivery = require('./deliveries-management/raja-ongkir/RajaOngkirQuery').getCostDelivery;
/*----------raja ongkir*/

//import order-management
var getOrders = require('./order-management/orders/OrdersQuery').getOrders;
var getOrdersByMember = require('./order-management/orders/OrdersQuery').getOrdersByMember;

//import payment-management
var PaymentMethods = require('./payment-management/payment-method/PaymentMethodQuery').PaymentMethods;

//import po-management cart&inquiries
var getCart = require('./po-management/cart/CartQuery').getCart;
var getCartByMemberID = require('./po-management/cart/CartQuery').getCartByMemberID;
import {
    getInquiry,
    getInquiryByMemberID
} from './po-management/inquiry/InquiryQuery';

// Query
exports.queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            settings: Settings,
            footer: Footer,
            sliders: Sliders,
            discounts: Discounts,
            promos: Promos,
            categories: Categories,
            provinces: Provinces,
            cities: Cities,
            couriers: Couriers,
            paymentMethods: PaymentMethods,
            members: members,
            products: Products,
            getPromoByID: getPromoByID,
            getPromoByMemberID: getPromoByMemberID,
            getCategory: getCategory,
            getCategoryList: getCategoryList,
            getCityByProvinceID: getCityByProvinceID,
            getCostDelivery: getCostDelivery,
            getMember: getMember,
            getMemberByFirebaseToken: getMemberByFirebaseToken,
            getAddressByMemberID: getAddressByMemberID,
            getProduct: getProduct,
            getProductByBrand: getProductByBrand,
            getProductByCategory: getProductByCategory,
            getCart: getCart,
            getCartByMemberID: getCartByMemberID,
            getInquiry: getInquiry,
            getInquiryByMemberID: getInquiryByMemberID,
            getOrders: getOrders,
            getOrdersByMember: getOrdersByMember,
        }
    }
});