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
  dob: {
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
  preferences: [String],
  avatar: {
    data: Buffer,
    contentType: String
  };
},
  {
    versionKey: false,
  });

module.exports = mongoose.model('Profile', profileSchema);
