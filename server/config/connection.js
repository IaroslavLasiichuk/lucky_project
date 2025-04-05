const mongoose = require('mongoose');
const config = require('./config');
require("dotenv").config();


mongoose.connect(config.mongoURI);


module.exports = mongoose.connection;