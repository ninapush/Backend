const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);