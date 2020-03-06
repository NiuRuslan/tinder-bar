const express = require('express');

const router = express.Router();

const Profile = require('../models/modelProfile'); // A.I. подключил модель монгоДБ

router.get('/', async (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/users', async (req, res) => {
  const {
    id,
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
  await Profile.updateOne({
    person: id
  }, {$set: {
    latitude,
    longitude,
    },
  });
  
  console.log('list', list);
  
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
