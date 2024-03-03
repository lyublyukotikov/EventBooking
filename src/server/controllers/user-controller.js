
import UserService from "../service/user-service.js";
// ипомортируем библиотеку для получения результата валидации
import { validationResult } from "express-validator";
// импортируем наш класс чтобы ловить ошибки
import ApiError from "../exceptions/api-error.js";
//импортируем переменную окружения 

import { config } from 'dotenv';
config();
// ссылка на клиент
// eslint-disable-next-line no-undef
const CLIENT_URL = process.env.VITE_CLIENT_URL;
class UserController {
  // регистрация
  async registration(req, res, next) {
    try {
      // создади переменную в которую будем класть ошибки валидации,в функцию validationRezult() передадим request от туда автоматически дастанется тело и провалидируется
      const errors = validationResult(req);
      // проверяем нашлась ли какая то ошибка при валидации если не нашлась передаем ее в Api-error
      if (!errors.isEmpty()) {
        return next(
          // передаем сообщение ошибка при валидации вторым параметром массив с ошибками
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password } = req.body; //вытаскиваем из тела почту и пароль
      // передаем сервису email и пароль пользователя
      const userData = await UserService.registration(email, password);
      // Сохраняем в cookie
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      // возвращаем на сервер
      return res.json(userData);
    } catch (error) {
      //Вызываем функцию next чтобы передать ошибку
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body; //вытаскиваем почту и пароль
      //передаем нашему сервису email и пароль который был в теле
      const userData = await UserService.login(email, password);
      // Сохраняем в cookie
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      // возвращаем на клиент
      return res.json(userData);
    } catch (error) {
      //Вызываем функцию next чтобы передать ошибку
      next(error);
    }
  }

  // Метод для выхода с аккаунта
  async logout(req, res, next) {
    try {
      // вытаскиваем из cookie refresh токен
      const { refreshToken } = req.cookies;
      // теперь передаем наш refresh токен сервису logout()
      const token = await UserService.logout(refreshToken);
      // удаляем саму куку с рефреш токеном
      res.clearCookie("refreshToken");
      // возвращаем ответ на клиент
      return res.json(token);
    } catch (error) {
      //Вызываем функцию next чтобы передать ошибку
      next(error);
    }
  }

  //метод для активации
  async activate(req, res, next) {
    try {
      // вытаскиваем ссылку
      const activation_link = req.params.link;
      // передаем эту ссылку активации в наш сервис userService в функцию activate
      await UserService.activate(activation_link);
      // делаем редирект на клиента
      return res.redirect(CLIENT_URL);
    } catch (error) {
      //Вызываем функцию next чтобы передать ошибку
      next(error);
    }
  }
  // метод для изменения токена
  async refresh(req, res, next) {
    try {
      // делаем запрос на клиент и вытаскиваем refreshToken
      const { refreshToken } = req.cookies;
      //передаем нашему сервису refresh токен и записываем  результат в переменную userData
      const userData = await UserService.refresh(refreshToken);
     // Сохраняем в cookie
     res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    // возвращаем на клиент
    return res.json(userData);
    } catch (error) {
      //Вызываем функцию next чтобы передать ошибку
      next(error);
    }
  }

  // метод для получения всех пользователей
  async getUsers(req, res, next) {
    try {
      // вызываем функцию в сервисе по получению всех пользователей 
      const users =await UserService.getAllUsers();
      // возвращаем их на клиент 
      return res.json(users);
    } catch (error) {
      //Вызываем функцию next чтобы передать ошибку
      next(error);
    }
  }
}

export default new UserController();
