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
                        msg: "Login Successful",
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
router.post("/register", async (req, res, next) => {
    let response = {
        success : true,
        msg : ""
    };

    //VALIDATIONS
    if (!req.body || !req.body.password || !req.body.userName)
    {
        response.success = false;
        response.msg = "User Name and Password is required";    
    } else if (req.body || req.body.userName) {
        req.body.userName = req.body.userName.toLowerCase();
        const user = await User.findOne({userName: req.body.userName})
        if (user) {
            //don't insert duplicates
            response.success = false;
            response.msg = `User Name: ${user.userName} already exists`;                         
        }       
    }

    if (response.success) {
        const saltHash = utils.genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const newUser = new User({
            userName: req.body.userName,
            hash: hash,
            salt: salt
        });

        try {
            _ = await newUser.save();
            response = { success: true, msg:"New User Successfully Saved"};
        } catch (err) {
            response = {success: false, msg: err }
        }   
    }

    res.json(response);
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