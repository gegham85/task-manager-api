const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const multer = require('multer');
// const sharp = require('sharp');

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();

        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }

    // user.save().then(() => {
    //     // if status is not set it'll be 200
    //     res.status(201).send(user);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // });
});

router.post('/users/login', async (req, res) => {
    try {
        // findByCredentials is custom function
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();

        return res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            // return true if it's not the used token by the user
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
     try {
         req.user.tokens = [];
         await req.user.save();
         res.send();
     } catch (e) {
         res.status(500).send();
     }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send();
    }

    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch((e) => {
    //     res.status(500).send();
    // });
});

// middleware is set for this route
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }

    // string id to objectId
    // let ObjectId = mongoose.Types.ObjectId(_id);
    //
    // User.findById(ObjectId).then((user) => {
    //     if (!user) {
    //         return res.status(404).send();
    //     }
    //
    //     res.send(user);
    // }).catch((e) => {
    //     res.status(500).send();
    // });
});


// *** upload file ***
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) { // this is gonna called internally by multer
        // cb is CallBack funcition
        // cb(new Error('file must be a pdf')) // when things go wrong
        // cb(undefined, true) // when success

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
            return cb(new Error('Please upload an image'));
        }

        cb(undefined, true);
    }
});

// there are two middlewares
// router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
//     const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer();
//     req.user.avatar = buffer;
//     await req.user.save();
//     res.send('aaaa');
// }, (error, req, res, next) => {
//     // this needs to have this call signature error, req, res, next
//     // this way express know this function is set up to handle any uncaught errors
//
//     res.status(400).send({ error: error.message });
// });

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send(200);
});

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            // throw new Error();
            res.status(500).send('not found');
        }

        // setting header
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send();
    }
});

// for updating existing resource
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    // const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    //
    // if (isValidOperation) {
    //     return res.status(400).send({ error: 'Invalid update!' });
    // }

    try {

        const _id = req.params.id;
        let ObjectId = mongoose.Types.ObjectId(_id);

        // const user = await User.findByIdAndUpdate(ObjectId, req.body, { new: true, runValidators: true });
        const user = await User.findById(ObjectId);

        updates.forEach((update) => user[update] = req.body[update]);

        // middleware is gonna be executed in models/user.js
        await user.save();

        if (!user) {
            return res.status(400).send();
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }

});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        return res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;