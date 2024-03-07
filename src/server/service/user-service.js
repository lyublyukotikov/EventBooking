/* eslint-env node */

import { User } from "../models/user-model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import MailService from "../service/mail.service.js";
import ApiError from "../exceptions/api-error.js";
//импортируем переменную окружения 
import { config } from 'dotenv';
config();
// ССЫЛКА на  cервер сайта
const VITE_API_URL =process.env.VITE_API_URL; // Добавил кавычки вокруг URL
console.log(VITE_API_URL)
class UserService {
  // Создание пользователя
  async registration(email, password) {
    //получаем почту и пароль
    // проверка на существования пользователя
    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      throw ApiError.BadRequest(
        `пользователь с почтовым адресом ${email} уже существует`
      );
    }

    // Если не существует, продолжается выполнение программы:

    // хешируем пароль
    const hashPassword = await bcrypt.hash(password, 3);
    // делаем ссылку для активации
    const activation_link = uuidv4();

    // Создаем объект пользователя
    const user = await User.create({
      email,
      password: hashPassword,
      activation_link,
    });

    // передаем нашему сервису mailService email нового пользователя и activationLink, которую мы создали (отправляем на почту письму с ссылкой на активацию)
    await MailService.sendActivationMail(
      email,
      `${VITE_API_URL}/activate/${activation_link}`
    );

    // используем dto
    const userDto = new UserDto(user); // id, email, isActivated

    // у сервиса tokenService вызываем функцию, которая вернет нам пару токенов
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  //функция активации приложения по почте
  async activate(activation_link) {
    //ищем пользователя в базе данных с такой же ссылкой активации
    const user = await User.findOne({
      where: { activation_link: activation_link },
    });

    // Если такого пользователя не существует пробрасываем ошибку
    if (!user) {
      throw ApiError.BadRequest("Некоректная ссылка активации");
    }
    //ставим полю isActivated значение true(то есть пользователь активирован)
    await User.update(
      { is_activated: true },
      { where: { activation_link: activation_link } }
    );

    await user.save(); //сохраняем
    await user.reload();
  }
  //функция для логина
  async login(email, password) {
    // ищем пользователя с такой же почтой
    const user = await User.findOne({ where: { email: email } });

    // Если пользователь не был найден пробрасываем ошибку
    if (!user) {
      throw ApiError.BadRequest("Пользовталь не был найден");
    }
    // сравниваем пароль который ввел пользователь с тем паролем что лежит у нас в базе данных
    // испольщуем встроенную в bcrypt функцию compare
    const isPassEquals = await bcrypt.compare(password, user.password);
    // Если пароле не сходятся тогда пробрасываем ошибку
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    // используем dto
    const userDto = new UserDto(user);
    // у сервиса tokenService вызываем функцию, которая вернет нам пару токенов
    const tokens = tokenService.generateTokens({ ...userDto });
    // cохраняем токены в базе
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    // возвращаем наши токены и присваеваем наше Dto
    return {
      ...tokens,
      user: userDto,
    };
  }
  // функция для выхода из аккаунта
  async logout(refreshToken) {
    // тут получаем токен и передаем его теперь уже в сервис token-service где мы его удалять будем
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  // Функция refresh
  async refresh(refreshToken) {
    console.log(refreshToken)
    // если нам пришел не токен а что то другое пробрасываем ошибку так как если токена у пользователя нет он не авторизован 
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    // если токен есть вызываем функцию валидации куда передаем наш токен
    const userData=tokenService.validateRefreshToken(refreshToken);
    console.log('Валидация токена успешна:', userData);
    // если токен есть вызываем функцию которая ищет токен в бд 
    const tokenFromDb=await tokenService.findToken(refreshToken);
    // console.log('Результат по поиску refresh токена:', tokenFromDb);
    // делаем проверку что и валидация и поиск в базе данных прошел успешно 
    if(!userData || !tokenFromDb){
      throw ApiError.UnauthorizedError();
      
    }
    // Если это не выполнилось мы как при логине генерируем новую пару токенов refresh сохраняем в базу данных \
    //  находим пользователя по первичному ключу 
    const user = await User.findByPk(userData.id);
     // используем dto
     const userDto = new UserDto(user);
     // у сервиса tokenService вызываем функцию, которая вернет нам пару токенов
     const tokens = tokenService.generateTokens({ ...userDto });
     // cохраняем токены в базе
     await tokenService.saveToken(userDto.id, tokens.refreshToken);
     // возвращаем наши токены и присваеваем наше Dto
     return {
       ...tokens,
       user: userDto,
     };

  }
  // реализуем фукнцию по получению всех пользователей 
  async getAllUsers(){
    //без параметров используем find которая выдаст всех пользователей 
    const users = await User.findAll();
    return users;
  }
}

export default new UserService(); //Экспортируем экземпляр класса
