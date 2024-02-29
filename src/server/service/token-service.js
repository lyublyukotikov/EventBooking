/* eslint-env node */

import jwt from "jsonwebtoken";
import { Token } from "../models/token-model.js";
//импортируем переменную окружения 
import { config } from 'dotenv';
config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

class TokenService {
  // Генерация токена
  generateTokens(payload) {
    if (!payload) {
      // Вывод ошибки в консоль
      console.log(
        `Ошибка по получению paylod,которые используем в генерации токена`
      );
      // проверка наличия payload
      throw new Error("Отсутствует payload для генерации токенов");
    }
    // Генерируем токены
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: "30d", //время жизни токена
    }); //
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "30d", //время жизни токена
    });
    // Возвращаем токены
    return {
      accessToken,
      refreshToken,
    };
  }

  // валидации токенов
  // Валидация токена AccrssTokena
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  // Валидация токена RefreshTokena
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  // Сохранение  токена
  async saveToken(userId, refreshToken) {
    //нам приходит userId и токен для замены
    // по одному токену на пользователя
    const tokenData = await Token.findOne({ where: { user_id: userId } }); //ищем в модели токена где id вписанное в форму равно id в сущности
    // То есть если у пользователя есть уже какой то токен мы меняем его
    if (tokenData) {
      tokenData.refreshToken = refreshToken; //Делаем замену
      if (!refreshToken) {
        console.error("Отсутствует refreshToken при сохранении токена");
        throw new Error("Отсутствует refreshToken при сохранении токена");
      }

      //  сохраняем новый токен
      return tokenData.save(); //возвращаем  новый токен
    }

    // если токена нет,тогда мы его создаем (пользователь еще не зарегистрировался )
    const token = await Token.create({
      user_id: userId,
      refresh_token: refreshToken,
    });
    return token;
  }

  // создаем функцию для удаления токена клиента
  async removeToken(refreshToken) {
    // ищем токен который нам надо и удаляем его
    const tokenData = await Token.destroy({
      where: { refresh_token: refreshToken },
    });
    return tokenData;
  }
  //Функция которая ищет токен в базе данных
  async findToken(refreshToken) {
    try {
      const tokenData = await Token.findAll({
        where: { refresh_token: refreshToken },
      });
      return tokenData;
    } catch (error) {
      console.error("Ошибка при поиске токена в базе данных:", error);

      return null;
    }
  }
}

export default new TokenService(); //Экспортируем экземпляр класса
