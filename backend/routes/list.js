const express = require('express');

const router = express.Router();

const Profile = require('../models/modelProfile'); // A.I. подключил модель монгоДБ


// эти функции используются для определения расстояния между точками на
// поверхности Земли, заданных с помощью географических координат
// результат возвращается в км
// (distHaversine(latlng, centerPoint)
const rad = (x) => x * Math.PI / 180;
/**
 *
 */
const distHaversine = (p1, p2) => {
  const R = 6371; // earth's mean radius in km
  const dLat = rad(p2.lat - p1.lat);
  const dLong = rad(p2.lng - p1.lng);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d.toFixed(3);
};


router.get('/', async (req, res) => {
  res.send('respond with a resource');
});

/**
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
    id,
    latitude,
    longitude,
    radius,
  } = req.body;
  if ([id, latitude, longitude, radius].some((el) => el === undefined)) {
    return res.send({
      success: false,
      err: 'Arguments is undefined',
    });
  }

  // /**
  //  * Расчитываем поправку к координатам (очень грубое вычисление)
  //  * @coeff - 1m in degree = 1 / 111320m = 0.000008983
  //  */
  // const coeff = 0.000008983;
  // const la1 = +latitude - radius * coeff;
  // const la2 = +latitude + radius * coeff;
  // const lo1 = +longitude - radius * coeff;
  // const lo2 = +longitude + radius * coeff;

  // const list = await Profile.find({
  //   latitude: { $gte: la1, $lte: la2 },
  //   longitude: { $gte: lo1, $lte: lo2 },
  // });

  // Поиск анкет по радиусу на карте

  const listAll = await Profile.find({});
  const list = [];
  listAll.forEach((el) => {
    if (distHaversine({
      lat: latitude,
      lng: longitude,
    }, {
      lat: el.latitude,
      lng: el.longitude,
    }) * 1000 < radius) list.push(el);
  });


  // Записываю текущие координаты пользователя
  await Profile.updateOne({
    person: id,
  }, {
    $set: {
      latitude,
      longitude,
    },
  });

  if (list) {
    return res.send({
      success: true,
      list,
    });
  }
  return res.send({
    success: false,
    err: 'No such user from this geolocation',
  });
});

module.exports = router;
