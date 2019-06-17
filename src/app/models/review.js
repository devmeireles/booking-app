const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const ReviewSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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

ReviewSchema.plugin(mongoosePaginate);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review