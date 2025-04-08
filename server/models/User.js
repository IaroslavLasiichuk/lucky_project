const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const { format } = require("date-fns");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  
  jobs: [
    {
      type: Schema.Types.ObjectId,
      res: 'Event'
    }
  ],
 
});

const User = mongoose.model('User', userSchema);

module.exports = User;