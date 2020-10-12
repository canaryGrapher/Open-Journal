const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imgURL: {
    type: String,
    default: null
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Record = mongoose.model('record', RecordSchema);
