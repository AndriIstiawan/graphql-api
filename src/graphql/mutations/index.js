//order management
var finalizeOrder = require('./../order-management/orders/mutations/finalizeOrder').finalizeOrder;
var finalizeMidtrans = require('./../order-management/orders/mutations/finalizeMidtrans').finalizeMidtrans;
var acceptInquiry = require('./../order-management/orders/mutations/acceptInquiry').acceptInquiry;

//cart & costum po
var addToCart = require('./../po-management/cart/mutations/addToCart').addToCart;
var removeFromCart = require('./../po-management/cart/mutations/removeFromCart').removeFromCart;
var setCartNote = require('./../po-management/cart/mutations/setCartNote').setCartNote;
var setCartPromo = require('./../po-management/cart/mutations/setCartPromo').setCartPromo;
var removeCartPromo = require('./../po-management/cart/mutations/removeCartPromo').removeCartPromo;
var setCartAddress = require('./../po-management/cart/mutations/setCartAddress').setCartAddress;
var setCartCourier = require('./../po-management/cart/mutations/setCartCourier').setCartCourier;
var setCartMidtrans = require('./../po-management/cart/mutations/setCartMidtrans').setCartMidtrans;
var addInquiry = require('./../po-management/inquiry/mutations/addInquiry').addInquiry;
var removeFromInquiry = require('./../po-management/inquiry/mutations/removeFromInquiry').removeFromInquiry;

//member
var registerMember = require('./../member-management/member/mutations/registerMember').registerMember;
var addAddressMember = require('./../member-management/member/mutations/addAddressMember').addAddressMember;
var addFirebaseToken = require('./../member-management/member/mutations/addFirebaseToken').addFirebaseToken;
var editAddressMember = require('./../member-management/member/mutations/editAddressMember').editAddressMember;
var deleteAddressMember = require('./../member-management/member/mutations/deleteAddressMember').deleteAddressMember;
var setAddressPrimary = require('./../member-management/member/mutations/setAddressPrimary').setAddressPrimary;
var verificationB2B = require('./../member-management/member/mutations/verificationB2B').verificationB2B;
var verificationB2C = require('./../member-management/member/mutations/verificationB2C').verificationB2C;
var resendVerification = require('./../member-management/member/mutations/resendVerification').resendVerification;
var loginMember = require('./../member-management/member/mutations/loginMember').loginMember;

module.exports = {
    addToCart,
    removeFromCart,
    setCartAddress,
    setCartNote,
    setCartPromo,
    removeCartPromo,
    setCartCourier,
    setCartMidtrans,
    addInquiry,
    removeFromInquiry,
    finalizeOrder,
    finalizeMidtrans,
    acceptInquiry,
    registerMember,
    addAddressMember,
    addFirebaseToken,
    editAddressMember,
    deleteAddressMember,
    setAddressPrimary,
    verificationB2B,
    verificationB2C,
    resendVerification,
    loginMember,
}