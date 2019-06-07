const mongoose = require('../../database');

const PhotoSchema = new mongoose.Schema({
    file: {
        type: String,
    },
    primary: {
        type: Boolean,
        default: false
    },
    accommodation:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accommodation',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo