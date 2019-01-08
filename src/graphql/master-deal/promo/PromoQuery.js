var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var PromoType = require('./PromoType').PromoType;
var PromoModel = require('./../../../models/master-deal/promo');
var MemberModel = require('./../../../models/member-management/member');

//view all promo
exports.Promos = {
    type: new GraphQLList(PromoType),
    resolve: function () {
        const promos = PromoModel.find({
            "deleted_at": null
        }).exec()
        if (!promos) {
            throw new Error('Error')
        }
        return promos;
    }
}

exports.getPromoByID = {
    type: PromoType,
    args: {
        ID: {
            type: GraphQLString,
        },
    },
    resolve: (root, params) => {
        const promos = PromoModel.findById(params.ID).exec()
        if (!promos) {
            throw new Error('Error')
        }
        return promos;
    }
}

exports.getPromoByMemberID = {
    type: new GraphQLList(PromoType),
    args: {
        memberID: {
            type: GraphQLString,
        },
    },
    resolve: async (root, params) => {
        const member = await MemberModel.findById(params.memberID).exec();

        var promosList = await PromoModel.find({
            "levels.0": {
                $exists: false
            },
            "members.0": {
                $exists: false
            },
            "deleted_at": null,
        }).exec();

        if (member) {
            const promos1 = await PromoModel.find({
                "levels": {
                    $elemMatch: {
                        "_id": String(member.level[0]["_id"])
                    }
                },
                "members.0": {
                    $exists: false
                },
                "deleted_at": null,
            }).exec();
            promosList = promosList.concat(promos1);

            const promos2 = await PromoModel.find({
                "levels.0": {
                    $exists: false
                },
                "members": {
                    $elemMatch: {
                        "_id": String(member.id)
                    }
                },
                "deleted_at": null,
            }).exec();
            promosList = promosList.concat(promos2);

            const promos3 = await PromoModel.find({
                "levels": {
                    $elemMatch: {
                        "_id": String(member.level[0]["_id"])
                    }
                },
                "members": {
                    $elemMatch: {
                        "_id": String(member.id)
                    }
                },
                "deleted_at": null,
            }).exec();
            promosList = promosList.concat(promos3);
        }

        return promosList;
    }
}