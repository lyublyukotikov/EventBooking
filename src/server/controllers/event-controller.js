// event-controller.js
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error.js";
import EventService from "../service/event-service.js";
class EventController {

  async createEvent(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }

      const {
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
      } = req.body;

      const userId = req.user.id; // Предполагается, что вы используете middleware для аутентификации и устанавливаете пользователя в req.user
      const userMail=req.user.email;//Получаем Email пользователя из middleware для аутентификации 
      const eventData = await EventService.createEvent({
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
        userMail

      
      }, 
      
      );

      console.log(eventData);
      return res.json(eventData);
    } catch (error) {
      next(error);
    }
  }
// получение событий пользователя по id 
  async getEventsByUser(req, res, next) {
    try {
      const userId = req.user.id;

      const userEvents = await EventService.getEventsByUser(userId);
      userEvents.sort((a, b) => a.id - b.id);
      return res.json(userEvents);
    } catch (error) {
      next(error);
    }
  }
  // Метод по удалению события которое пренадлежит пользователю 
  async deleteEvent(req, res, next) {
    try {
      const userId = req.user.id;
      const eventId = req.params.eventId;


      // Удаляем событие
      const deleteEvent = await EventService.deleteEvent(eventId,userId);
      return res.json(deleteEvent);
      
    } catch (error) {
      next(error);
    }
  }

  // Метод для получения всех событий
  async getAllEvents(req, res, next) {
    try {
      const events = await EventService.getAllEvents();
      
      events.sort((a, b) => a.id - b.id);
  
      return res.json(events);
    } catch (error) {
      next(error);
    }

  
}
// метод для бронирования дат 
async bookEventDatesController(req, res, next) {
  try {
    const userId = req.user.id; 
    const eventData = req.body; 
    // передаем данные в сервис 
    const bookedDates = await EventService.bookEventDates(eventData, userId);
    // возвращаем данные на клиент 
    return res.json(bookedDates);
  } catch (error) {
    console.error('Ошибка в bookEventDatesController:', error);
    next(error);
  }
}

  // Метод для получения всех событий
  async getAllEventsBooking(req, res,next) {
    try {
      // Ваша логика для получения всех событий, например, из базы данных
      const events = await EventService.getAllBookings(); // Предположим, что у вас есть модель EventModel

      // Возвращаем найденные события
      return res.json(events);
    }  catch (error) {
      console.error('Ошибка в bookEventDatesController:', error);
      next(error);
    }
  }
  // Метод для получения броней события по id 
  async getBookingByID(req, res) {
  
    const userId = req.user.id; // Предположим, что у вас есть авторизация и вы получаете пользователя из токена
  
    try {
      // Передаем данные в сервис для получения события по id
      const event = await EventService.getBookingByID( userId);
  
      // Проверяем, найдено ли событие
      if (!event) {
        return res.status(404).json({ error: 'Событие не найдено' });
      }
  
      // Возвращаем найденное событие
      return res.status(200).json({ event });
    } catch (error) {
      console.error('Ошибка при получении события по id:', error);
      return res.status(500).json({ error: 'Ошибка при получении события по id' });
    }
  }

  // Метод для удаления 
  async deleteBookingByData(req, res) {
    const { eventId, date } = req.body;
    const userId = req.user.id;
  
    try {
      // Передаем данные в сервис по удалению 
      await EventService.deleteBookingByData({userId, eventId, date});
  
      // Возвращаем ответ об удалении 
      return res.status(200).json({ message: 'Бронирование успешно удалено' });
    } catch (error) {
      console.error('Ошибка при удалении бронирования:', error);
      return res.status(500).json({ error: 'Ошибка при удалении бронирования' });
    }
  }
  
}

export default new EventController();