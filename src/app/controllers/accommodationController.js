const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const Accommodation = require('../models/accommodation');
const Photo = require('../models/photo');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try{

        var page = 1;

        if(req.query.page)
            var { page} = req.query;

        const options = {
            page: parseInt(page, 10),
            sort: { createdAt: -1},
            populate: ['user', 'photos']
        };

        console.log(page);

        const accommodations = await Accommodation.paginate({}, options)
        
        return res.json({
            success: true,
            data: accommodations
        });
    }catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            message: 'Cannot list Accommodations'
        });
    }
});

router.get('/:accommodationID', async (req, res) => {
    try{
        const accommodation = await Accommodation
        .findById(req.params.accommodationID)
        .populate(['user', 'photos']);

        return res.json({
            success: true,
            data: accommodation
        });
    }catch(err){
        return res.status(400).json({
            success: false,
            message: 'Cannot list Accommodation'
        });
    }
});

router.delete('/:accommodationID', async (req, res) => {
    try{
        await Accommodation.findByIdAndRemove(req.params.accommodationID);

        return res.json({
            success: true,
        });
    }catch(err){
        return res.status(400).json({
            success: false,
            message: 'Cannot delete Accommodation'
        });
    }
});

router.post('/', async (req, res) => {
    try{
        const {photos, ...data} = req.body;

        const accommodation = await Accommodation.create({...data, user: req.user});

        await Promise.all(photos.map(async photo => {
            const accommodationPhoto = new Photo({ ...photo, accommodation: accommodation._id});

            await accommodationPhoto.save();

            accommodation.photos.push(accommodationPhoto);

        }));

        await accommodation.save();


        return res.json({
            success: true,
            data: accommodation
        });
        
    }catch(err){
        console.log(err);
        res.status(400).send({ error: 'Error creating new Accommodation'});
    }
});

router.put('/:accommodationID', async (req, res) => {
    try{
        const {photos, ...data} = req.body;

        const accommodation = await Accommodation.findByIdAndUpdate(req.params.accommodationID, {
            ...data
        },{new: true});

        accommodation.photos = [];
        await Photo.remove({ accommodation: accommodation._id});

        await Promise.all(photos.map(async photo => {
            const accommodationPhoto = new Photo({ ...photo, accommodation: accommodation._id});

            await accommodationPhoto.save();

            accommodation.photos.push(accommodationPhoto);

        }));

        await accommodation.save();


        return res.json({
            success: true,
            data: accommodation
        });
        
    }catch(err){
        console.log(err);
        res.status(400).send({ error: 'Error updating Accommodation'});
    }
});

module.exports = app => app.use('/accommodations', router);