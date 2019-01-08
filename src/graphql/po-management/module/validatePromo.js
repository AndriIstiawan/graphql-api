var MemberModel = require('../../../models/member-management/member');
var PromoHistory = require('./../../../models/member-management/promoHistory');
var mongoose = require('mongoose');

exports.validatePromoMember = async (promo, member_id) => {
    var member = MemberModel.find({});
    if (promo.members.length > 0) {
        const member_array = promo.members.map(obj => {
            return obj._id;
        });
        member.find({
            "_id": {
                $in: member_array
            }
        });
    }
    if (promo.levels.length > 0) {
        const level_array = promo.levels.map(obj => {
            return mongoose.Types.ObjectId(obj._id);
        });
        member.find({
            "level._id": {
                $in: level_array
            }
        });
    }

    member.exec();
    var status_member = await member.then(function (result) {
        return result.filter(obj => {
            return obj._id == member_id;
        }).length > 0;
    });
    return status_member;
};

exports.validatePromoHistory = async (promo_id, member_id) => {
    return await PromoHistory.find({
        "member_id": member_id,
        "promo": {
            $elemMatch: {
                "_id": mongoose.Types.ObjectId(promo_id)
            }
        }
    }).then(result => {
        if(result.length > 0){
            return false;
        }else{
            return true;
        }
    });
};