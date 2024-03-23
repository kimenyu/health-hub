const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
    consultant: { type: Schema.Types.ObjectId, ref: 'Consultant', required: true },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    notes: { type: String },

});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
