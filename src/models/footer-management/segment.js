var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SegmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    attr: {
        type: Array
    }
});
var Model = mongoose.model('segment', SegmentSchema);
module.exports = Model;