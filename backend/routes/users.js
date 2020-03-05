const express = require('express');
const router = express.Router();

const Person = require('../models/modelPerson'); // A.I. подключил модель монгоДБ

/* GET users listing. */
router.get('/', async function (req, res, next) {
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
    name,
    email,
    password,
  } = req.body;
  const user = await Person.findOne({ email });
  if (!user) {
    userNew = await Person.create({
      name,
      email,
      password
    });
    return res.send({
      success: true,
      date: userNew._id,
    });
  } else {
    return res.send({
      success: false,
      err: 'Email is already registered'
    })
  }
});

module.exports = router;
