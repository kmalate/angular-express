const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

// ------ HELPER FUNCTIONS ------

/*
@param {*} password - plain text password
@param {*} hash - hash stored in database
@param {*} salt - salt stored in database

Decrypts hash using the salt then compares with the password provided
*/
function validPassword(password, hash, salt) {
    let hashVerify = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");
    return hash == hashVerify;
}

/*
@param {*} password - user password string

Takes plain text password and creates salt and hash out of it.
*/
function genPassword(password) {
    let salt = crypto.randomBytes(32).toString("hex");
    let genHash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");
    
    return {
        salt: salt,
        hash: genHash
    };
}

/*
@param {*} user - The user object
*/
function issueJWT(user) {
    const _id = user._id;
    const expiresIn = 300;

    const payload =  {
        sub: _id,
        iat: Date.now(),
    };

    const signedToken = jsonwebtoken.sign(
        payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: "RS256"}
    );

    return {
        token: "Bearer " + signedToken,
        expiresIn: expiresIn
    };
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;