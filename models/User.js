const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  given_name: {
    type: String,
    required: true,
  },
  family_name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    lowercase: true,
    trim: true,
  },
  profilePicture: {
    type: String,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
});

 


const User =  mongoose.models.User || mongoose.model('User', userSchema); 

module.exports = User;
