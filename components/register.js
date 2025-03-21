const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
  online: {
    Boolean: false,
  },
  timestamp: {
    type: Date,
    default: new Date()
  }
});

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
