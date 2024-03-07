import { makeAutoObservable } from "mobx";
import { Iuser } from "../models/IUser";
import { toJS } from 'mobx';

// импортируем модель которую будем отправлять серверу по бронированию дней 
import IBooking from  "../models/IBooking"
// импортируем модель фото
import { Photo } from "../models/Photo.ts";
import AuthService from "../services/AuthService";
// импортируем дефолтный инстакс аксиос
import axios from "axios";
//импортируем нашу модель authResponse
import { AuthResponse } from "../models/response/AuthResponse";
// импортируем настройки нашего axios
import $api, { VITE_API_URL } from "../http/index.js";

// импортируем модель альбома
import { Album } from "../models/Album.js";
import { Event } from "../models/Events.ts";
// импортируем сервис по получению альбомов
import AlbumService from "../services/AlbumsService.js";
// импортируем сервис по получению фотографий в альбоме
import PhotoService from "../services/PhotoService.js";
import EventService from "../services/EventsService.ts";
// ccылка на сервер

export default class Store {
  
  user = {} as Iuser; //храним данные  пользователя
  isAuth = false; //храним статус авторизован или нет

  loginError = ""; // храним ошибки логина и авторизации
  albums: Album[] = []; // Храним список альбомов
  selectedAlbum: string | null = null; //храним альбом который выбрал пользователь чтобы отобразить
  photosInSelectedAlbum: Photo[] = []; //храним фото в альбоме
  events: Event[] = []; //храним массив постов которые делаем
  eventsById: Event[] = []; //храним массив событий которые создал определенный прльзователь
  bookingsStatus=""; //храним массив броней пользователей которые приходят в ответе с сервера 
  bookingsDate = []; //храним все бронирования которые поступили 
  bookingsDateByUserId=[] //храним все бронирования по id пользователя 
  constructor() {
    makeAutoObservable(this);
  }
  // делаем мутация для изменения полей нашего стора,все что мы делаем это изменяем текующее значение на то,что мы получаем в параметрах
  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  // Мутация для изменения пользтвателя
  setuser(user: Iuser) {
    this.user = user;
  }
 
  // Мутация для хранения ошибок
  setLoginError(err: string) {
    this.loginError = err;
  }
  // Мутация для обновления списка альбомов
  setAlbums(albums: Album[]) {
    this.albums = albums;
  }
  //мутация для установки альбома который выбрад пользователь чтобы просмотреть
  setSelectedAlbum(albumId: string | null) {
    this.selectedAlbum = albumId;
  }
  //  мутация для обновления списка фотографий в выбранном альбоме
  setPhotosInSelectedAlbum(photos: Photo[]) {
    this.photosInSelectedAlbum = photos;
  }
  //  мутация для обновления списка событий
  setEvents(events: Event[]) {
    this.events = events;
  }
  //  мутация для обновления списка событий размещенных определенным пользователем
  setEventsById(eventsById: Event[]) {
    this.eventsById = eventsById;
  }
   // мутация для обновления списка статус бронирования 
  setBookings(newBookings) {
    this.bookingsStatus = newBookings;
  }
  // Мутация для обновления полученных бронирований по id пользователя 
  setBookingsByIdUser(bookingsDateByUserId){
    this.bookingsDateByUserId=bookingsDateByUserId;
  }
  // Мутация для обновления списка получаемых забронированных дней 
  setBookingsDate(bookingsDate) {
    this.bookingsDate = bookingsDate;
  }
  //  реализуем асинхронные экшены для логина и регистрации и для проверки авторизован пользователь или нет
  // login
  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);

      // кладем токен в localStorage
      localStorage.setItem("token", response.data.accessToken);
      // если все прошло успешно тогда вызываем мутацию setAuth и передаем туда true
      this.setAuth(true);
      // мы получили в ответе данны о пользователе передаем их в мутацию setuser
      this.setuser(response.data.user);
      
    } catch (error) {
      this.setLoginError(error.response?.data?.message);

    }
  }
  // registration
  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      // кладем токен в localStorage
      localStorage.setItem("token", response.data.accessToken);
      // если все прошло успешно тогда вызываем мутацию setAuth и передаем туда true
      this.setAuth(true);
      // мы получили в ответе данны о пользователе передаем их в мутацию setuser
      this.setuser(response.data.user);
    } catch (error) {
      this.setLoginError(error.response?.data?.message);
    }
  }

  // logout
  async logout() {
    try {
      // вызываем функцию в сервисе авторизации и ничего туда не передаем
      const response = await AuthService.logout();
      
      // убираем токен из localStorage
      localStorage.removeItem("token");
      
      // делаем юзера пустым
      this.setuser({} as Iuser);
  
      this.setAuth(false);
  
      return Promise.resolve(); // Resolve the promise indicating successful logout
    } catch (e) {
      console.error("Ошибка при logout", e);
      return Promise.reject(e); // Reject the promise if there's an error during logout
    }
  }

  //  // проверка авторизован пользователь или нет каждый раз когда пользователь заходит на наш сайт
  async checkAuth() {
    
    try {
      const response = await axios.get<AuthResponse>(`${VITE_API_URL}/refresh`, {
        withCredentials: true,
      });
      //если запрос прошел успешно,значит пользователь авторизован,его refresh токен еще валиден

      // кладем токен в localStorage
      localStorage.setItem("token", response.data.accessToken);
      // если все прошло успешно тогда вызываем мутацию setAuth и передаем туда true
      this.setAuth(true);
      // мы получили в ответе данны о пользователе передаем их в мутацию setuser
     
      this.setuser(response.data.user);
    } catch (error) {
      console.log(error.response?.data?.message);
    } 
  }

  // Получение альбомов
  async getAlbums() {
    try {
      const response = await AlbumService.getAlbums(); // получение AxiosResponse
      const albums = response.data; // обращение к свойству data
      this.setAlbums(albums); // Используйте мутацию для обновления списка альбомов
    } catch (error) {
      console.error("Ошибка при получении альбомов", error);
    }
  }
  // получение фото в альбоме
  async getPhotoInSelectedAlbum() {
    try {
      //проверяем выбранный альбом
      if (!this.selectedAlbum) {
        console.error("Выбранного альбома нет");
        return;
      }
      //вызываем метод PhotoService дял получение фотографий в выбранном альбоме
      const response = await PhotoService.getPhotosInAlbum(this.selectedAlbum);
     
      // Обновляем свойство, хранящее фотографии в выбранном альбоме
      this.setPhotosInSelectedAlbum(response.data);
    } catch (error) {
      console.error("Ошибка при получение фотографий в альбоме", error);
    }
  }

  // Метод для добавления фотографии в несколько альбомов
  async addPhotoToAlbums(
    albumIds: number[],
    title: string,
    file: File | undefined
  ) {
    try {
      if (!file) {
        console.error("Не выбран файл");
        return;
      }

      const promises = albumIds.map(async (albumId) => {
        const response = await PhotoService.addPhotoToAlbum(
          albumId,
          title,
          file
        );
        const newPhoto = response.data.photo; // Обращаемся к полю photo в ответе
      });

      await Promise.all(promises);

      console.log("Фотография успешно добавлена в альбомы");
    } catch (error) {
      console.error("Ошибка при добавлении фотографии в альбомы", error);
    }
  }
  // Новый метод для создания события
  async createEvent(eventData: Event) {
    try {
      const response = await EventService.createEvent(eventData);
      const newEvent = response.data;
      console.log(newEvent);
      return newEvent;
    } catch (error) {
      console.error("Ошибка при создании события", error);
      throw error;
    }
  }
  // Получение всех альбомов
  async getAllEvents() {
    try {
      const response = await EventService.getAllEvents();
      const events = response.data; // Извлекаем данные из AxiosResponse

      // Обновляем переменную events
      this.setEvents(events);
       
      return events;
    } catch (error) {
      console.error("Ошибка при получении событий", error);
      throw error; // Если нужно обработать ошибку дальше
    }
  }
  // получение событий по id пользователей
  async getAllEventsByUser() {
    try {
      const response = await EventService.getAllEventsByUser();
      const eventsById = response.data; // Извлекаем данные из AxiosResponse

      

      // Обновляем переменную events
      this.setEventsById(eventsById);

      return eventsById;
    } catch (error) {
      console.error("Ошибка при получении событий", error);
      throw error; // Если нужно обработать ошибку дальше
    }
  }

  // удаление события по id 
  async deleteEvent(eventId) {
    try {
      // вызываем метод deleteEvent из сервиса
      const response = await EventService.deleteEvent(eventId);



      // Обновим список событий
      await this.getAllEventsByUser();
    } catch (error) {
      console.error("Ошибка при удалении события", error);
      throw error;
    }
  }



  //метод для бронирования событий
  async sendEventData(bookingData: { date: string; eventId: number }[]) {
    try {
      const response = await EventService.bookEvent(bookingData);
  
      // Обновляем bookings в хранилище с данными из ответа сервера
      this.setBookings(response.data);
  
      
  
      // Возвращаем ответ с сервера, если нужно
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке данных события:", error);
      throw error;
    }
  }
   // Метод для получения всех бронирований
   async getAllBookings() {
    try {
      const response = await EventService.getAllBookings();
      const bookingsDate = response.data; // Извлекаем данные из AxiosResponse
      // Обновляем переменную bookings в хранилище
      this.setBookingsDate(bookingsDate);
      return bookingsDate;
    } catch (error) {
      console.error("Ошибка при получении бронирований", error);
      throw error; // Если нужно обработать ошибку дальше
    }
  }
    // получение бронирований по id пользователя 
    async getBookingsByUserId() {
      try {
        const response = await EventService.getBookingsByUserId();
        const bookingsDateByUserId = response.data; // Извлекаем данные из AxiosResponse
        // Обновляем переменную bookings в хранилище
        this.setBookingsByIdUser(bookingsDateByUserId);
        return bookingsDateByUserId;
      } catch (error) {
        console.error("Ошибка при получении бронирований по id пользователя", error);
        throw error; // Если нужно обработать ошибку дальше
      }
    }
   // Метод для удаления бронирования
   async deleteBookingByData(bookingData: {  eventId: number; date: string }) {
    try {
      
      // Вызываем метод deleteBookingByData из сервиса
      const response = await EventService.deleteBookingByData(bookingData);
      // Обновляем список бронирования после удаления вызвав метод  getAllBookings()
      await this.getAllBookings();
    } catch (error) {
      console.error("Ошибка при удалении бронирования", error);
      throw error;
    }
  }
}
