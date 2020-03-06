const router = require('express').Router();
const Person = require('../models/modelPerson'); // A.I. подключил модель монгоДБ
const Profile = require('../models/modelProfile');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('respond with a resource');
});

/**
 *  Aleksandr Ivanov
 * Проверяю данные пользователя:
 * @email
 * @password
 * Отдаю объект:
 * @success - флаг выполнения запроса
 * @data - объект с данными пользователя
 *    @nickname
 *    @id
 * @err - Расшифровка ошибки
 */
router.post('/login', async (req, res) => {
  const {
    email,
    password,
  } = req.body;
  const user = await Person.findOne({ email, password });
  if (user) {
    const profile = await Profile.findById({ person: user._id });
    const profileId = (await Person.findOne({ email, password }).populate('profileId')).profileId
    return res.send({
      success: true,
      date: {
        nickname: user.nickname,
        id: user._id,
        profileId: user.profileId,
      },
    });
  }
  return res.send({
    success: false,
    err: 'No such user or incorrect pair login password',
  });
});

/**
 *  Aleksandr Ivanov
 * Проверяю на уникальность поле: email
 * Вношу нового пользователя в базу
 * Отдаю объект:
 * @success - флаг выполнения запроса
 * @data - Айди созданного пользователя
 * @err - Расшифровка ошибки
 */
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
      date: userNew._id,
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
