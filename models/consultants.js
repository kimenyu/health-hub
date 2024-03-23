const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consultantSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    specialty: { type: String, required: true },
    contactInfo: { type: String },
    location: { type: String },
    rating: { type: Number },
    reviews: { type: Array },
    services: { type: Array },
    isAvailable: { type: Boolean, default: true}
});

const Consultant = mongoose.model('Consultant', consultantSchema);

module.exports = Consultant;
