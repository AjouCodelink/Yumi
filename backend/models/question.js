var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const QuestionSchema = mongoose.Schema({
    id : {type :String},
    content : {type: String}
});

// create new User document
QuestionSchema.statics.create = function(Question_info) {
    const {
        id,
        content
    } = Question_info;


    const Question = new this({
        id,
        content,
    })
    // return the Promise
    return Question.save()
}


module.exports = mongoose.model('question', QuestionSchema);