// Aleksandr Ivanov
const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    nickname: String,
    email: String,
    password: String,
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile"
    },
    chats: Array
  },
<<<<<<< HEAD
  {
    versionKey: false
  }
);
=======
  chats: Array,
},
{
  versionKey: false,
});
>>>>>>> f2fce00ee64f097407490609c2b9f9278a536d51

module.exports = mongoose.model("Person", personSchema);
