const mongoose = require('mongoose');
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  email: String,
  email: String,
  password: String,
  birthday: Date,
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
},
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Person', personSchema);
