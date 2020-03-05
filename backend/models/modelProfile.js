const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  }
},
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Profile', profileSchema);
