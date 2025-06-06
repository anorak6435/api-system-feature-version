const mongoose = require('mongoose');

const SystemSchema = mongoose.Schema({
    name: String,
    features: [String], // referencing the features _id that are linked to this system.
    is_active : Boolean // also whole systems of an app should be able to be toggled off.
});

const System = mongoose.model('System', SystemSchema);

module.exports = System;