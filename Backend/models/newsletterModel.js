const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate emails
  },
  subscribedAt: {
    type: Date,
    default: Date.now, // Automatically set the current date
  },
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
