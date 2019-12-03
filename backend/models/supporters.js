var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SupportersSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    contact: { type: String},
    text: { type: String},
    photo_path: { type: String}
});

// create new User document
SupportersSchema.statics.create = function(supporter_info) {
    const {
        supporter_name,
        email,
        contact,
        text,
        photo_path
    } = supporter_info;


    const supporter = new this({
        supporter_name,
        email,
        contact,
        text,
        photo_path
    })
    // return the Promise
    return supporter.save()
}

SupportersSchema.methods.assignAdmin = function() {
    this.admin = true
    return this.save()
}

module.exports = mongoose.model('supporter', SupportersSchema);