const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true,
    },
    ownerId: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });

module.exports = model('book', bookSchema);
