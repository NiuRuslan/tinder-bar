// Aleksandr Ivanov
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  nickname: String,
  email: String,
  password: String,
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
  chats: [{
    chat:{
      type:String,
      default:'',
    },
    nickname:String,
    date:Date,
    lastMessage:String
  }],
},
{
  versionKey: false,
});

// Person.updateMany({nickname:"Daniil"},{$push:{chats:'sjgndfnbkdjfb'}})
module.exports = mongoose.model('Person', personSchema);
