var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SupportersSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    contact: { type: String},
    text: { type: String},
    photo_path: { type: String}, //TODO: 프론트에서 서포터리스트에서 accept 하면 DB에 넣는 Flag 변수인 Boolean type 을 추가
    isAccepted: {type: Boolean}
});

// create new User document
SupportersSchema.statics.create = function(supporter_info) {
    const {
        name,
        email,
        contact,
        text,
        photo_path
    } = supporter_info;


    const supporter = new this({
        name,
        email,
        contact,
        text,
        photo_path,
        isAccepted : false
    })
    // return the Promise
    return supporter.save()
}


module.exports = mongoose.model('supporter', SupportersSchema);