import $api from "../http/index.js";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse.js";

export default class AuthService {
  // делаем функцию на сервер для логина 
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }
// делаем функцию для запроса на сервер для регистрации 
  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", { email, password });
  }
// делаем функцию для поста на сервер о выходе пользователя из аккаунта 
  static async logout(): Promise<AxiosResponse<any>> {
    return $api.post("/logout");
  }
}