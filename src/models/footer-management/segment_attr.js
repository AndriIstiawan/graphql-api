var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SegmentattrSchema = new Schema({
    name: {
        type: String
    },
    slug: {
        type: String
    },
    type: {
        type: String
    },
    url: {
        type: String
    },
    urlicon: {
        type: String
    },
    icon: {
        type: String
    },
    textArea: {
        type: String
    },
    urlmedia: {
        type: String
    }
});
var Model = mongoose.model('segment_attributes', SegmentattrSchema);
module.exports = Model;