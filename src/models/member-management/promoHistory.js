var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PromoHistorySchema = new Schema({
    member_id: {
        type: String
    },
    promo: {
        type: Array
    },
    created_at: {
        type: String
    },
});
var Model = mongoose.model('promo_history', PromoHistorySchema);
module.exports = Model;