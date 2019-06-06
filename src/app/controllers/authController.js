const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400
    });
}

router.post('/register', async(req, res) => {
    const { email, password} = req.body;

    try{
        if(await User.findOne({ email }))
            return res.status(400).send({ error: 'User already exists'});

        if(password.length < 6)
            return res.status(400).send({ error: 'Password too short'});
        
        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({
            user,
            token: generateToken({id: user.id})
        });
        
    }catch(err){
        return res.status(400).send({error: 'Registration fail'});
    }
});

router.post('/autenticate', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.status(400).send({ error: 'User not found' });

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid Password' });

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400
    });

    return res.send({
        user,
        token: generateToken({id: user.id})
    });
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try{
        const user = await User.findOne({ email });

        if(!user)
            return res.status(400).send({ error: 'User not found'});

        const token = crypto.randomBytes(20).toString('hex');
        
        var now = new Date();
        now.setHours( now.getHours() + 1 );

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now
            }
        });

        var mailOptions = {
            from: 'dev.meireles@gmail.com',
            to: email,
            subject: 'Hello ✔',
            text: 'Hello world ?',
            html: `<b>${token}</b>`
        };

        mailer.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(err);
                return res.status(400).send({ error: 'Cannot send forgot password email'});
            }

            mailer.close();
            return res.send();
        });

    }catch(err){
        console.log(err);
        res.status(400).send({ error: 'Error on forgot password'});
    }
});

router.post('/reset-password', async (req, res) => {
    const { email, token, password } = req.body;

    try{
        const user = await User.findOne({ email })
            .select('+passwordResetToken, +passwordResetExpires');

            console.log(user);

        if(!user)
            return res.status(400).send({ error: 'User not found'});

        if(token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Wrong token'});

        const now = new Date();

        if(now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Expired token'});

        user.password = password;

        await user.save();

        res.send();


    }catch(err){
        res.status(400).send({ error: "Cannot reset password"});
    }
});

module.exports = app => app.use('/auth', router);