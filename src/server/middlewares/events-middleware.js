import moment from "moment";
import { Op } from "sequelize";
import { Event } from "../models/event.js"; // Подставьте вашу модель данных для событий

export default async function validateAndCheckDateOverlap(req, res, next) {
  const { firstProbableDate, lastProbableDate, convenientDate } = req.body;

  const currentDate = moment();
  const maxDate = moment().add(5, 'years');

  const validationErrors = [];

  if (!firstProbableDate || !moment(firstProbableDate).isBetween(currentDate, maxDate, null, '[]')) {
    validationErrors.push({
      type: 'field',
      value: firstProbableDate,
      msg: 'Первый вероятный день должен быть в промежутке от настоящего дня до +5 лет',
      path: 'firstProbableDate',
      location: 'body'
    });
  }

  if (!convenientDate || !moment(convenientDate).isBetween(firstProbableDate, lastProbableDate, null, '[]')) {
    validationErrors.push({
      type: 'field',
      value: convenientDate,
      msg: 'Удобная дата должна быть в промежутке между первым и последним вероятными днями',
      path: 'convenientDate',
      location: 'body'
    });
  }

  try {
    // Проверяем пересечение с другими событиями
    const overlappingEvents = await Event.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { firstProbableDate: { [Op.lte]: lastProbableDate } },
              { lastProbableDate: { [Op.gte]: firstProbableDate } }
            ]
          },
          {
            [Op.and]: [
              { firstProbableDate: { [Op.lte]: convenientDate } },
              { lastProbableDate: { [Op.gte]: convenientDate } }
            ]
          }
        ]
      }
    });

    if (overlappingEvents.length > 0) {
      validationErrors.push({
        type: 'field',
        value: '',
        msg: 'Выбранные даты пересекаются с уже зарегистрированными событиями',
        path: 'firstProbableDate, convenientDate',
        location: 'body'
      });
    }
  } catch (error) {
    console.error('Ошибка при запросе в базу данных:', error);

    // Добавьте обработку ошибки, в зависимости от типа ошибки
    if (error.name === 'SequelizeDatabaseError' && error.parent && error.parent.routine === 'DateTimeParseError') {
      validationErrors.push({
        type: 'field',
        value: '',
        msg: 'Ошибка в формате даты',
        path: 'firstProbableDate, lastProbableDate, convenientDate',
        location: 'body'
      });
    } else {
      return res.status(500).json({ msg: 'Внутренняя ошибка сервера' });
    }
  }

  if (validationErrors.length > 0) {
    return res.status(400).json({
      message: 'Ошибка при валидации',
      errors: validationErrors
    });
  }

  next();
}