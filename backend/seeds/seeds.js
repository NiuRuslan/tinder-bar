const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://TinderBar:TinderBar@cluster0-bajz8.mongodb.net/TinderBar?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const Profile = require("../models/modelProfile");
const Person = require("../models/modelPerson");

async () => {
  const Person1 = new Person({
    nickname: "Olyaaa",
    email: "olyakiba@mail.com",
    password: "1111111"
  });
  await Person1.save();

  const Person2 = new Person({
    nickname: "Danyaa",
    email: "danya@mail.com",
    password: "2222222"
  });
  await Person2.save();

  const Person3 = new Person({
    nickname: "Sanyaaa",
    email: "sanya@mail.com",
    password: "3333333"
  });
  await Person3.save();

  const Profile1 = new Profile({
    name: "Olyaa",
    DoB: "1998-06-01",
    activity: "teacher",
    about: "playing",
    topics: "swimming, singing",
    drinks: "beer",
    latitude: 55.734973,
    longitude: 37.619144
  });
  await Profile1.save();

  const Profile2 = new Profile({
    name: "Danyaa",
    DoB: "1993-06-01",
    activity: "dancer",
    about: "running",
    topics: "singing, swimming",
    drinks: "wiskey",
    latitude: 55.737263,
    longitude: 37.471979
  });
  await Profile2.save();

  const Profile3 = new Profile({
    name: "Sanya",
    DoB: "1987-06-01",
    activity: "doctor",
    about: "dancing",
    topics: "cooking, swimming",
    drinks: "winw",
    latitude: 55.736879,
    longitude: 37.483627
  });
  await Profile3.save();
  await mongoose.connection.close();
};
(async () => {
  // await Person.updateOne(
  //   { nickname: "Olyaaa" },
  //   { $set: { profileId: "5e68988e12db1032709ef4ce" } }
  // );
  // await Person.updateOne(
  //   { nickname: "Danyaa" },
  //   { $set: { profileId: "5e68988e12db1032709ef4cf" } }
  // );
  // await Person.updateOne(
  //   { nickname: "Sanyaaa" },
  //   { $set: { profileId: "5e68988f12db1032709ef4d0" } }
  // );
  await Profile.updateOne(
    { name: "Olyaa" },
    { $set: { person: "5e6897ab59780a324c6ec9bd" } }
  );
  await Profile.updateOne(
    { name: "Danyaa" },
    { $set: { person: "5e6897ad59780a324c6ec9be" } }
  );
  await Profile.updateOne(
    { name: "Sanya" },
    { $set: { person: "5e6897ad59780a324c6ec9bf" } }
  );
  await mongoose.connection.close();
})();
