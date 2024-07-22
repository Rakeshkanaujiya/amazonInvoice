const mongoose = require("mongoose")
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
});

module.exports = mongoose.model('formDataSchema',formDataSchema)