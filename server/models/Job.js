const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");
const { format } = require("date-fns");

const jobSchema = new Schema({
  date: {
    type: String,
    trim: true,
  },
  
  username:  {
    type: String,
    trim: true,
  },
  
  authorId:  {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  
  createdAt: {
    type: String,
    default: format(new Date(), "MMMM do yyyy, h:mm:ss a"),
  },
  updatedAt: {
    type: String,
    default: format(new Date(), "MMMM do yyyy, h:mm:ss a"),
  } 
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
