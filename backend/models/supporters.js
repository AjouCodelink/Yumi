var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SupportersSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    contact: { type: String},
    text: { type: String},
    photo_path: { type: String}
});

module.exports = mongoose.model('supporter', SupportersSchema);