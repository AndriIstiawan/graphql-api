var GraphQLString = require('graphql').GraphQLString;
var CartType = require('./../CartType');
var CartModel = require('./../../../../models/po-management/cart/cart');
var CourierModel = require('./../../../../models/deliveries-management/courier');
var RajaOngkir = require('./../../../../app/RajaOngkirConfig').RajaOngkir;
var mongoose = require('mongoose');

//add module
var cartUpdateTotal = require('./../../module/cartUpdateTotal').cartUpdateTotal;
var setPromo = require('./../../module/setPromo').setPromo;

//get cart by id
exports.setCartCourier = {
    type: CartType.CartType,
    args: {
        memberID: {
            type: GraphQLString
        },
        courierKey: {
            type: GraphQLString
        },
        courierService: {
            type: GraphQLString
        },
        cartType: {
            type: GraphQLString,
        }
    },
    resolve: async (root, params) => {
        var setCourier = [];
        var payment_status = false;
        var cart_status = "";
        const courier = await CourierModel.find({
            slug: params.courierKey
        }).exec();

        //jika courier bukan default dari sistem (ecommerce courier)
        if (courier[0].type == 'e-commerce courier') {
            cart_status = "waiting courier cost";
            const setService = courier.map(obj => {
                return obj.service.find(o => o.name === params.courierService);
            });
            setCourier = [{
                "code": courier[0].slug,
                "name": courier[0].courier,
                "detail": courier,
                "costs": [{
                    "service": setService[0].name,
                    "description": setService[0].description,
                    "cost": [{
                        "value": 0,
                        "etd": "",
                        "note": ""
                    }]
                }]
            }];
        } else {
            //get cart by member ID, status, and type 
            const cart = await CartModel.findOne({
                "member": {
                    $elemMatch: {
                        "_id": mongoose.Types.ObjectId(params.memberID)
                    }
                },
                "type": params.cartType,
                "deleted_at": null
            })
            .then(result => {
                return result;
            })
            .catch(err => {
                return [];
            });

            if(cart.address.length > 0){
                var parameter = {
                    origin: courier[0].location[0].city_id, // ID Kota atau Kabupaten Asal
                    destination: cart.address[0].city_id, // ID Kota atau Kabupaten Tujuan
                    weight: cart.total_weight[0].weight // Berat Barang dalam gram (gr)
                };

                switch(params.courierKey){
                    case "tiki":
                        setCourier = await RajaOngkir.getTIKICost(parameter).then(function (result) {
                            return result.rajaongkir.results;
                        }).catch(function (error) {
                            return null;
                        });
                    break;
                    case "pos":
                        setCourier = await RajaOngkir.getPOSCost(parameter).then(function (result) {
                            return result.rajaongkir.results;
                        }).catch(function (error) {
                            return null;
                        });
                    break;
                    default:
                        setCourier = await RajaOngkir.getJNECost(parameter).then(function (result) {
                            return result.rajaongkir.results;
                        }).catch(function (error) {
                            return null;
                        });
                    break;
                }

                const setExtService = setCourier.map(obj => {
                    return obj.costs.find(o => o.service === params.courierService);
                });
                payment_status = true;
                cart_status = "waiting for payment";
                setCourier[0].costs = setExtService;
                setCourier[0].detail = courier;
            }
        }

        const updatedCart = await CartModel.findOneAndUpdate({
            "member": {
                $elemMatch: {
                    "_id": mongoose.Types.ObjectId(params.memberID)
                }
            },
            "type": params.cartType,
            "deleted_at": null
        },
            {
                "courier": setCourier,
                "payment_status": payment_status,
                "status": cart_status
            }
        );

        if(await cartUpdateTotal(updatedCart._id)){
            console.log('cartUpdateTotal success');
        }
        if(updatedCart.promo.length > 0){
            console.log(await setPromo("cart", updatedCart.id));
        }
        return await CartModel.findById(updatedCart.id).exec();
    }
}