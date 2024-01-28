const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  otp: {
    type: String,
  },
});

module.exports = mongoose.model('User', EmailSchema);