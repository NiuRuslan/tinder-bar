const express = require('express');
const router = express.Router();

const Profile = require('../models/modelProfile'); // A.I. подключил модель монгоДБ

/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.send('respond with a resource');
});

/**
 * Aleksandr Ivanov
 * Получаем запрос с координатами и радиусом поиска
 * @latitude
 * @longitude
 * @radius
 * Отдаю объект:
 * @success - флаг выполнения запроса
 * @list - массив объектов - анкеты пользователей
 * @err - Расшифровка ошибки
 */
router.post('/users', async (req, res) => {
  const {
    latitude,
    longitude,
    radius,
  } = req.body;
  const list = await Profile.find({
    latitude: {
      $gte: latitude - radius,
      $ls: latitude + radius
    },
    longitude: {
      $gte: longitude - radius,
      $ls: longitude + radius
    }
  });
  if (list) {
    return res.send({
      success: true,
      list
    });
  } else {
    return res.send({
      success: false,
      err: 'No such user from this geolocation'
    })
  }
});

module.exports = router;
