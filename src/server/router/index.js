import { Router } from "express";
// Импортируем Controller
import UserController from "../controllers/user-controller.js";
// импортируем контроллер альбомов
import AlbumController from "../controllers/album-controller.js";
// импортируем настройки upload для отправки изображений
import upload from "../upload-config/upload.js";
//ипортируем функцию для валидации
import { body } from "express-validator";
// импортируем middle ware авторизации
import authMiddleware from "../middlewares/auth-middleware.js";
// импортируем сервис событий 
import EventController from "../controllers/event-controller.js";
// испортируем middleware для обработки даты на сервере 
import validateFirstProbableDate from "../middlewares/events-middleware.js"
//  испортируем middleware для проверки двойных бронирований одной даты одного события 
import checkExistingBookings from "../middlewares/booking-middleware.js"
//Создаем Router
const router = new Router();
// настраиваем multer 

// роутер регистрации,авторизации и получения пользователей
router.post("/registration",
      body("email").isEmail().withMessage('Неверный формат почты'), //валидируем почту 
      body('password').isLength({ min: 3, max: 32 }).withMessage('Пароль должен быть от 3 до 32 символов'), //валидируем длину пароля 
       UserController.registration); //для регистрации
       
router.post("/login",UserController.login); //для входа
router.post("/logout",UserController.logout); //для выхода из аккаунта
// Енд поинт который мы будем слать пользователю для активации аккаунта 
router.get("/activate/:link",UserController.activate); //для подтверждения по почте
router.get("/refresh",UserController.refresh); //отправляем refresh,получаем новый refresh и access(перезапись)
router.get("/users",
           authMiddleware,
           UserController.getUsers); //получение  uers (только для авторизованных пользователей)

// роутер для получения изображений 
// Роут для создания альбома
router.post('/album', AlbumController.createAlbum);

// Роут для получения всех альбомов что есть в базе данных
router.get('/albomlist',AlbumController.getAllAlbumList)


// Роут для получения списка фотографий в альбоме
router.get('/albums/:albumId/photos', AlbumController.getPhotoList);

// Роут для обновления альбома
router.put('/album/:id', AlbumController.updateAlbum);

// Роут для удаления альбома
router.delete('/album/:id', AlbumController.deleteAlbum);

// Роут для добавления фотографии в альбом
router.post('/album/:albumId/photo', upload.single('photo'), AlbumController.addPhotoToAlbum);

// Роут для добавления фотографии в несколько альбомов
router.post('/photos/:albumIds', upload.single('photo'), AlbumController.addPhotoToAlbums);


// Роуты Событий:
// Маршрут для создания события
router.post(
  '/create',
  [
    body('eventName', 'Название события не может быть пустым').notEmpty(),
    body('organizerFirstName', 'Имя организатора не может быть пустым').notEmpty(),
    body('organizerLastName', 'Фамилия организатора не может быть пустой').notEmpty(),
    body('eventAddress', 'Адрес события не может быть пустым').notEmpty(),
    body('eventDescription', 'Описание события не может быть пустым').notEmpty(),
    body('firstProbableDate', 'Первый вероятный день не может быть пустым').notEmpty(),
    body('lastProbableDate', 'Последний вероятный день не может быть пустым').notEmpty(),
    body('eventStartTime', 'Начало события не может быть пустым').notEmpty(),
    body('eventEndTime', 'Конец события не может быть пустым').notEmpty(),
    body('convenientDate', 'Удобная для вас дата не может быть пустой').notEmpty(),
    
  ],
  authMiddleware, // Middleware для аутентификации пользователя
  validateFirstProbableDate, // Ваш middleware для валидации даты
  EventController.createEvent
);
// Маршрут для получения событий пользователя
router.get('/user-events', authMiddleware, EventController.getEventsByUser);
// Маршрут по удалению событий по id события 
router.delete('/events/:eventId', authMiddleware, EventController.deleteEvent);
// Маршрут для получения всех событий
router.get('/all', authMiddleware, EventController.getAllEvents);
// броинирование дат событий пользователем 
router.post('/bookings', authMiddleware,checkExistingBookings, EventController.bookEventDatesController);
// Роут для получения всех событий
router.get('/all-events-booking', authMiddleware, EventController.getAllEventsBooking);
// Роут получения бронирований пользователя по его ID
router.get('/bookings-by-user-id', authMiddleware, EventController.getBookingByID);
// Роут для удаления бронирования по данным пользователя и события
router.delete('/delete-booking', authMiddleware, EventController.deleteBookingByData);

export default router; //икспортируем router
