const router = require('express').Router();
const Person = require('../models/modelPerson'); // A.I. подключил модель монгоДБ
const Profile = require('../models/modelProfile');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/login', async (req, res) => {
  const {
    email,
    password,
  } = req.body;
  const user = await Person.findOne({ email, password });
  const profileId = (await Person.findOne({ email, password }).populate('profileId')).profileId
  if (user) {
    return res.send({
      success: true,
      nickname: user.nickname,
      id: user._id,
      profileId,
    });
  }
  return res.send({
    success: false,
    err: 'No such user or incorrect pair login password',
  });
});

router.post('/registration', async (req, res) => {
  const {
    nickname,
    email,
    password,
  } = req.body;
  if (nickname === '' || email === '' || password === '') {
    return res.send({
      success: false,
      err: 'Wrong data',
    });
  }
  const user = await Person.findOne({ email });
  if (!user) {
    const userNew = await Person.create({
      nickname,
      email,
      password,
    });
    return res.send({
      success: true,
      id: userNew._id,
    });
  }
  return res.send({
    success: false,
    err: 'Email is already registered',
  });
});

router.post('/profile', async (req, res) => {
  const {
    name,
    DoB,
    activity,
    topics,
    about,
    drinks,
    avatar,
    id,
  } = req.body;
  const user = await Person.findOne({ _id: id });
  if (!user.profileId) {
    const newProfile = await Profile.create({
      person: id,
      name,
      DoB,
      activity,
      topics,
      about,
      drinks,
      avatar,
    });
    await Person.updateOne(user, { $set: { profileId: newProfile._id } });
    return res.send({
      success: true,
    });
  }
  await Person.updateOne({ _id: user.profileId }, {
    $set: {
      activity,
      topics,
      about,
      drinks,
      avatar,
    },
  });
});

module.exports = router;
