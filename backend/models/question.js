var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const QuestionSchema = mongoose.Schema({
    email : {type :String},
    content : {type: String}
});

// create new User document
QuestionSchema.statics.create = function(Question_info) {
    const {
        email,
        content
    } = Question_info;


    const Question = new this({
        email,
        content,
    })
    // return the Promise
    return Question.save()
}


module.exports = mongoose.model('question', QuestionSchema);