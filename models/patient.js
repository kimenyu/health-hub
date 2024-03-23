const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email already exists"],
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
      },
      message: "Please provide a valid email",
    },
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username already exists"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password should be at least 6 characters long"],
    trim: true,
  },
  role : {
    type: String,
    default: 'patient',
  }
});

module.exports = mongoose.model('Patient', patientSchema);