var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LevelSchema = new Schema({
    order: {
        type: Number
    },
    key_id: {
        type: String
    },
    parent: {
        type: Array
    },
    name: {
        type: Number
    },
    loyalty_point: {
        type: Number
    },
    hutang: {
        type: Number
    }
});
var Model = mongoose.model('level', LevelSchema);
module.exports = Model;