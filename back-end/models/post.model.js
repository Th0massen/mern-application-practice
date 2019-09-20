const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 250,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema);