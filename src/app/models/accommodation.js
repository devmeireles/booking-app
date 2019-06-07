const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const Amenities = new mongoose.Schema({
    title: {
        type: String
    }
});

const SleepingArrangements = new mongoose.Schema({
    title: {
        type: String
    },

    description: {
        type: String
    }
});

const AccommodationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: "title",
        slug_padding_size: 4,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    baths: {
        type: Number,
        required: true
    },
    amenities: [Amenities],
    sleepingArrangements: [SleepingArrangements],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    photos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
    }],
    availability: {
        type: Boolean,
        required: true,
        default: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

AccommodationSchema.plugin(mongoosePaginate);

const Accommodation = mongoose.model('Accommodation', AccommodationSchema);

module.exports = Accommodation