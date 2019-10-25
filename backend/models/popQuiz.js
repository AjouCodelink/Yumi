var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const QuizSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    answer: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('quiz', QuizSchema);