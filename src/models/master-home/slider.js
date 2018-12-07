var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SliderSchema = new Schema({
    title: {
        type: String
    },
    image: {
        type: String
    },
    redirect: {
        type: Boolean
    },
    url: {
        type: String
    },
});
var Model = mongoose.model('slider', SliderSchema);
module.exports = Model;