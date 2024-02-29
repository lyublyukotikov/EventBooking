import moment from 'moment-timezone';
import { Op } from 'sequelize';
import { Booking } from '../models/booking-model.js';
import {Event} from "../models/event.js"
export default async function checkExistingBookings(req, res, next) {
  const userId = req.user.id;
  const eventData = req.body;

  try {

    
    // если нет даты или id события пробрасываем ошибку
    if (!eventData.bookedDates || eventData.bookedDates.length === 0 || !eventData.bookedDates[0].eventId) {
      throw new Error('Выберите даты перед отправкой');
    }
    // записывем id события в переменную 
    const eventId = eventData.bookedDates[0].eventId;
    // Проверка бронирований
    const existingBookings = await Booking.findAll({
      where: {
        UserId: userId,
        EventId: eventId,
        date: {
          [Op.in]: eventData.bookedDates.map(date => moment(date.date).tz('Europe/Moscow').format()),
        },
      },
    });

    if (existingBookings.length > 0) {
      const conflictingDates = existingBookings.map(booking => moment(booking.date).tz('Europe/Moscow').format('DD.MM.YYYY'));
      const errorMessage = `Для события (${eventId}) Вами ранее уже были забронированы даты: ${conflictingDates.join(', ')}`;
      const error = new Error(errorMessage);
      error.status = 400;
      throw error;
    }

   
    const existingEvent = await Event.findOne({
      where: {
        UserId: userId,
        convenientDate: {
          [Op.in]: eventData.bookedDates.map(date => moment(date.date).tz('Europe/Moscow').startOf('day').format()),
        },
      },
    });

    if (existingEvent) {
      const conflictingEventDate = moment(existingEvent.convenientDate).tz('Europe/Moscow').format('DD.MM.YYYY');
      const errorMessage = `Вы уже участвуете в событии в этот день (${conflictingEventDate})`;
      const error = new Error(errorMessage);
      error.status = 400;
      throw error;
    }

    next();
  } catch (error) {
    console.error('Ошибка в checkExistingBookings:', error);
    return res.status(error.status || 500).json({ error: error.message || 'Ошибка при проверке бронирований' });
  }
}