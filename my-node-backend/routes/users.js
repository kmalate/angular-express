const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = mongoose.model("User");
const passport = require("passport");
const utils = require("../lib/utils");

// users/login
router.post("/login", (req, res, next) => {
    User.findOne({userName: req.body.userName})
        .then((user) => {
            if (!user) {
                res.status(401).json({success: false, msg: "could not find the user"});
            }
            else {
                const isValid = utils.validPassword(
                    req.body.password,
                    user.hash,
                    user.salt    
                );
    
                if (isValid) {
                    const tokenObject  = utils.issueJWT(user);
    
                    res.status(200).json({
                        success: true,
                        token: tokenObject.token,
                        expiresIn: tokenObject.expiresIn
                    });
                } else {
                    res.status(401)
                        .json({success: false, msg: "you entered the wrong password"});
                }
            }
        })
        .catch((err) => {
            next(err);
        });
});

// users/register
router.post("/register", (req, res, next) => {
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        userName: req.body.userName,
        hash: hash,
        salt: salt
    });

    try {
        newUser.save().then((user) => {
            res.json({ success: true, user: user});
        });
    } catch (err) {
        res.json({success: false, msg: err })
    }
});

router.get(
    "/protected",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
        res.status(200).json({
            success: true,
            msg: "You are successfully authenticated to this route!",
        });
    }
);

module.exports = router;