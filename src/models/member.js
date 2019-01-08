var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});
var Model = mongoose.model('MemberTest', memberSchema);
module.exports = Model;