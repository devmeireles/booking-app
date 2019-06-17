const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const Review = require('../models/review');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try{

        var page = 1;

        if(req.query.page)
            var { page} = req.query;

        const options = {
            page: parseInt(page, 10),
            sort: { createdAt: -1},
            populate: ['user']
        };

        const reviews = await Review.paginate({}, options)
        
        return res.json({
            success: true,
            data: reviews
        });
    }catch(err){
        return res.status(400).json({
            success: false,
            message: 'Cannot list reviews'
        });
    }
});

router.post('/', async (req, res) => {
    try{
        const data = req.body;

        const review = await Review.create({...data, user: req.user});

        return res.json({
            success: true,
            data: review
        });
        
    }catch(err){
        console.log(err);
        res.status(400).send({ error: 'Error creating new review'});
    }
});


module.exports = app => app.use('/review', router);