const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  DoB: {
    type: Date,
    required: true,
  },
  activity: {
    type: String,
    required: true,
    minlength: 5,
  },
  about: {
    type: String,
    minlength: 3,
  },
  topics: [String],
  drinks: [String],
  avatar: {
    data: Buffer,
    contentType: String,
  },
  latitude: Number,
  longitude: Number,
},
{
  versionKey: false,
});

module.exports = mongoose.model('Profile', profileSchema);
