var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {
        type: String
    },
    slug: {
        type: String
    },
    parent: {
        type: Array
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    }
});
var Model = mongoose.model('categorie', CategorySchema);
module.exports = Model;