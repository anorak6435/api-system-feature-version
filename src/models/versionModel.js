const mongoose = require('mongoose');

const VersionSchema = mongoose.Schema({
    name: String,
    systems: [String],
    features: [String], // referencing the features _id that are linked to this system.
    version: Number,
    is_active : Boolean // also whole systems of an app should be able to be toggled off.
});

const System = mongoose.model('Version', VersionSchema);

module.exports = System;