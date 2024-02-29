// тут настраиваем axios

import axios from "axios";
import { config } from "dotenv";
import { AuthResponse } from "../models/response/AuthResponse";

// ccылка на сервер
export const API_URL = `http://localhost:5000/api/`;

const $api = axios.create({
  // чтобы каждый раз циплялся токен в заголовок
  withCredentials: true,
  baseURL: API_URL,
});
// запрос
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
// ответ
$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        console.log("Не авторизован");
      }
    }
    throw error;
  }
);

export default $api;

// интрерцептор - с помощью axios мы можем сделать запрос и получить ответ от сервера,можем на каждый запрос и ответ повесить interceptor(перехватчик),который на каждый запрос и каждый ответ
//  интерцептор на запрос будет каждый раз вешать в header Authorization и помещать туда Access_token(чтобы мы каждый раз не цыпляли в ручную )
//интрецептор который мы будем вешать на ответ от сервира
// -если статус ответа 20  мы получили нужные данные просто пропускаем
// -если статус ответа 401(не авторизован) т.е умер access токен мы отправляем refresh токен на сервер:если он есть,если валдиный сервер возвращает новую пару access токен мы сохраняем на клиенте,а потом мы сново отправляем запрос но уже с обновленным токеном
