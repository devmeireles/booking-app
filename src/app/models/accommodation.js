const mongoose = require('../../database');

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
    description: {
        type: String,
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});



const Accommodation = mongoose.model('Accommodation', AccommodationSchema);

module.exports = Accommodation