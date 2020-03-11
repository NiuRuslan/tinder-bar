const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://TinderBar:TinderBar@cluster0-bajz8.mongodb.net/TinderBar?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Сбрасываем базу
//mongoose.connection.dropDatabase();

const Profile = require("../models/modelProfile");
const Person = require("../models/modelPerson");

(async () => {
  const person11 = await new Person({
    nickname: "AI11",
    email: "ai11@mail.com",
    password: "123456"
  }).save();

  const profile11 = await new Profile({
    person: person11._id,
    name: "AI11",
    DoB: "1998-06-01",
    activity: "teacher",
    about: "playing",
    topics: "swimming",
    drinks: "beer",
    latitude: 55.760760396131055,
    longitude: 37.64179515107962,
  }).save();

  await Person.updateOne(
    { id: person11._id },
    { $set: { profileId: profile11._id } }
  );

  const person10 = await new Person({
    nickname: "AI10",
    email: "ai10@mail.com",
    password: "123456"
  }).save();

  const profile10 = await new Profile({
    person: person10._id,
    name: "AI10",
    DoB: "1998-06-01",
    activity: "teacher",
    about: "playing",
    topics: "swimming",
    drinks: "beer",
    latitude: 55.749168447350826,
    longitude: 37.65003661767483,
  }).save();

  await Person.updateOne(
    { id: person10._id },
    { $set: { profileId: profile10._id } }
  );

  const person9 = await new Person({
    nickname: "AI9",
    email: "ai9@mail.com",
    password: "123456"
  }).save();

  const profile9 = await new Profile({
    person: person9._id,
    name: "AI9",
    DoB: "1998-06-01",
    activity: "teacher",
    about: "playing",
    topics: "swimming",
    drinks: "beer",
    latitude: 55.73583344686089,
    longitude: 37.63733102334055,
  }).save();

  await Person.updateOne(
    { id: person9._id },
    { $set: { profileId: profile9._id } }
  );

  const person8 = await new Person({
    nickname: "AI8",
    email: "ai8@mail.com",
    password: "123456"
  }).save();

  const profile8 = await new Profile({
    person: person8._id,
    name: "AI8",
    DoB: "1998-06-01",
    activity: "teacher",
    about: "playing",
    topics: "swimming",
    drinks: "beer",
    latitude: 55.73254731225675,
    longitude: 37.616040567969655,
  }).save();

  await Person.updateOne(
    { id: person8._id },
    { $set: { profileId: profile8._id } }
  );

  const person7 = await new Person({
    nickname: "AI7",
    email: "ai7@mail.com",
    password: "123456"
  }).save();

  const profile7 = await new Profile({
    person: person7._id,
    name: "AI7",
    DoB: "1998-06-01",
    activity: "teacher",
    about: "playing",
    topics: "swimming",
    drinks: "beer",
    latitude: 55.74279140696091,
    longitude: 37.58753882932796,
  }).save();

  await Person.updateOne(
    { id: person7._id },
    { $set: { profileId: profile7._id } }
  );

  const person6 = await new Person({
    nickname: "AI6",
    email: "ai6@mail.com",
    password: "123456"
  }).save();

  const profile6 = await new Profile({
    person: person6._id,
    name: "AI6",
    DoB: "1998-06-01",
    activity: "teacher",
    about: "playing",
    topics: "swimming",
    drinks: "beer",
    latitude: 55.73641332425031,
    longitude: 37.59887084589635,
  }).save();

  await Person.updateOne(
    { id: person6._id },
    { $set: { profileId: profile6._id } }
  );

  const person5 = await new Person({
    nickname: "AI5",
    email: "ai5@mail.com",
    password: "123456"
  }).save();

  const profile5 = await new Profile({
    person: person5._id,
    name: "AI5",
    DoB: "1998-06-01",
    activity: "teacher",
    about: "playing",
    topics: "swimming",
    drinks: "beer",
    latitude: 55.76423730899697,
    longitude: 37.59371992927436,
  }).save();

  await Person.updateOne(
    { id: person5._id },
    { $set: { profileId: profile5._id } }
  );

  const person4 = await new Person({
    nickname: "AI4",
    email: "ai4@mail.com",
    password: "123456"
  }).save();

  const profile4 = await new Profile({
    person: person4._id,
    name: "AI4",
    DoB: "1998-06-01",
    activity: "teacher",
    about: "playing",
    topics: "swimming",
    drinks: "beer",
    latitude: 55.75074443022084,
    longitude: 37.607714177120016,
  }).save();

  await Person.updateOne(
    { id: person4._id },
    { $set: { profileId: profile4._id } }
  );

  const person3 = await new Person({
    nickname: "AI3",
    email: "ai3@mail.com",
    password: "123456"
  }).save();

  const profile3 = await new Profile({
    person: person3._id,
    name: "AI3",
    DoB: "1998-06-01",
    activity: "teacher",
    about: "playing",
    topics: "swimming",
    drinks: "beer",
    latitude: 55.752773187995196,
    longitude: 37.62376786725857,
  }).save();

  await Person.updateOne(
    { id: person3._id },
    { $set: { profileId: profile3._id } }
  );

  const person2 = await new Person({
    nickname: "AI2",
    email: "ai2@mail.com",
    password: "123456"
  }).save();

  const profile2 = await new Profile({
    person: person2._id,
    name: "AI2",
    DoB: "1998-06-01",
    activity: "teacher",
    about: "playing",
    topics: "swimming",
    drinks: "beer",
    latitude: 55.75045459906845,
    longitude: 37.63424139772332,
  }).save();

  await Person.updateOne(
    { id: person2._id },
    { $set: { profileId: profile2._id } }
  );

  const person1 = await new Person({
    nickname: "AI1",
    email: "ai1@mail.com",
    password: "123456"
  }).save();


  const profile1 = await new Profile({
    person: person1._id,
    name: "AI1",
    DoB: "1998-06-01",
    activity: "teacher",
    about: "playing",
    topics: "swimming",
    drinks: "beer",
    latitude: 55.735187115034904,
    longitude: 37.62325159275163
  }).save();

  await Person.updateOne(
    { id: person1._id },
    { $set: { profileId: profile1._id } }
  );

  await mongoose.connection.close();
})();
