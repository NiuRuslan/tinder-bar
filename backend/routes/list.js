const express = require('express');

const router = express.Router();

const Profile = require('../models/modelProfile'); // A.I. подключил модель монгоДБ

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('respond with a resource');
});

/**
<<<<<<< HEAD
 *  Aleksandr Ivanov
 *
 * @email
 * @password
=======
 * Aleksandr Ivanov
 * Получаем запрос с координатами и радиусом поиска
 * @latitude
 * @longitude
 * @radius
>>>>>>> b1f8c2f55af6e12bb0f22c31a70fa5721cd334b9
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
  /**
   * Расчитываем поправку к координатам (очень грубое вычисление)
   * @coeff - 1m in degree = 1 / 111320m = 0.000008983
   */
  const coeff = 0.000008983;  
  const la1 = +latitude - radius * coeff;
  const la2 = +latitude + radius * coeff;
  const lo1 = +longitude - radius * coeff;
  const lo2 = +longitude + radius * coeff;
  
  const list = await Profile.find({
    latitude: {$gte: la1, $lte: la2},
    longitude: {$gte: lo1, $lte: lo2},
  });
  
  // Записываю текущие координаты пользователя
  await Profile.updateOne({_id: '5e6102bf79e480d766a5911c'}, {$set: {
    geolocation: {
      latitude: +latitude,
      longitude: +longitude,
    },
  }});
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
  return res.send({
    success: false,
    err: 'Email is already registered',
  });
});

module.exports = router;
