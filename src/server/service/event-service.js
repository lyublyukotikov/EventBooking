// event-service.js
import { Event } from '../models/event.js';
import ApiError from '../exceptions/api-error.js';
import {User} from "../models/user-model.js"
import { Booking } from '../models/booking-model.js';
class EventService {
  // создание события 
async createEvent({
  eventName,
  organizerFirstName,
  organizerLastName,
  eventAddress,
  eventDescription,
  firstProbableDate,
  lastProbableDate,
  eventStartTime,
  eventEndTime,
  convenientDate,
  userId,
  userMail,

}) {
  try {
    // Создаем событие
    const event = await Event.create({
      eventName,
      organizerFirstName,
      organizerLastName,
      eventAddress,
      eventDescription,
      firstProbableDate,
      lastProbableDate,
      eventStartTime,
      eventEndTime,
      convenientDate,
      UserId: userId,
      userEmail:userMail,
    });

    
    // Возвращаем объект события с email пользователя
    return {
      ...event.toJSON(),
      
    };
  } catch (error) {
    throw ApiError.InternalServerError('Ошибка при создании события');
  }
}
//  вывод события по id пользователя 
  async getEventsByUser(userId) {
    try {
      const userEvents = await Event.findAll({
        where: {
          UserId: userId,
        },
      });

      return userEvents;
    } catch (error) {
      throw ApiError.InternalServerError('Ошибка при получении событий пользователя');
    }
  }
  
// Удаление события по id и userId
async deleteEvent(eventId, userId) {
  try {
    const userEventDelete = await Event.findOne({
      where: {
        id: eventId,
        UserId: userId,
      },
    });

    if (!userEventDelete) {
      throw ApiError.NotFound('Событие не найдено или не принадлежит пользователю');
    }

    // Находим все связанные бронирования
    const bookingsToDelete = await Booking.findAll({
      where: {
        EventId: eventId,
      },
    });

    // Удаляем все связанные бронирования в параллели
    await Promise.all(bookingsToDelete.map(booking => booking.destroy()));

    // Удаляем событие
    await userEventDelete.destroy();

    return userEventDelete;
  } catch (error) {
    throw ApiError.InternalServerError('Ошибка при удалении события');
  }
}
// получение всех событий 
async getAllEvents() {
    try {
      const allEvents = await Event.findAll();

      return allEvents;
    } catch (error) {
      throw ApiError.InternalServerError('Ошибка при получении всех событий');
    }
  }
  // бронирование событий 
  async bookEventDates(eventData, userId) {
    try {
      // берем id события 
      const eventId = eventData.bookedDates[0].eventId; 
  
      const bookingDataArray = eventData.bookedDates.map((date) => ({
        date: date.date,
        UserId: userId,
        EventId: eventId,
      }));
      // создаем запись о бронировании 
      await Booking.bulkCreate(bookingDataArray);
     
  
      return { message: 'Бронирование успешно создано' };
    } catch (error) {
      // Обработка ошибок
      console.error('Ошибка в bookEventDates:', error);
      throw new ApiError(500, 'Ошибка при бронировании дат');
    }
  }
  // Получения всех броинирований
  async getAllBookings() {
    try {
      // Здесь вы можете получить все бронирования с информацией о пользователе
      const bookings = await Booking.findAll({
        include: [{ model: User, attributes: ['email'] }],
      });
  
      return bookings.map((booking) => ({
        date: booking.date,
        eventId: booking.EventId,
        userEmail: booking.User ? booking.User.email : null, // Проверяем, что User не null
      }));
    } catch (error) {
      console.error('Ошибка в getAllBookings:', error);
      throw new ApiError(500, 'Ошибка при получении бронирований');
    }
  }
  // получения броней по id пользователя 
  async  getBookingByID(userId) {
    try {
      // Используйте вашу модель для бронирований для запроса броней пользователя из базы данных
      const bookings = await Booking.findAll({
        where: {
          UserId: userId,
        },
      });
  
      // Возвращаем найденные брони
      return bookings;
    } catch (error) {
      console.error('Ошибка при получении бронирований по id пользователя:', error);
      throw new Error('Ошибка при получении бронирований по id пользователя');
    }
  }

  // удаление броин по id пользователя id события и дате 
  async deleteBookingByData( {userId, eventId, date }) {
    try {
      
      // Удаления из таблицы 
      await Booking.destroy({
        where: {
          UserId: userId,
          EventId: eventId,
          date: date,
        },
      });

      return { message: 'Бронирование успешно удалено' };
    } catch (error) {
      console.error('Ошибка в deleteBookingByData:', error);
      throw new ApiError(500, 'Ошибка при удалении бронирования');
    }
  }
}

export default new EventService();
