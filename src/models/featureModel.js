const mongoose = require('mongoose');

const FeatureSchema = mongoose.Schema({
    name: String,
    code: String,
    is_active : Boolean
});

const Feature = mongoose.model('Feature', FeatureSchema);

module.exports = Feature;