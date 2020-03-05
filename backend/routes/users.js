const router = express.Router();

const Person = require('../models/modelPerson'); // A.I. подключил модель монгоДБ
const Profile = require('../models/modelProfile');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('respond with a resource');
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
    email,
    name,
    DoB,
    topics,
    about,
    drinks,
    avatar,
  } = req.body;
  const user = await Person.findOne({ email });
  if (!user.profileId) {
    const newProfile = new Profile({
      email,
      name,
      DoB,
      activity,
      topics,
      about,
      drinks,
      avatar,
    });
    await Person.updateOne({ user }, { $set: { profileId: newProfile._id } });

    return res.send({
      success: true,
      date: userNew._id,
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
