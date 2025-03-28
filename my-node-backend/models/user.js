const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: String,
    hash: String,
    salt: String,
});

mongoose.model('User', userSchema);