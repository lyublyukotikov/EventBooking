// Класс, который расширяет Error в JavaScript
export default class ApiError extends Error {
  status;
  errors;

  // конструктор принимает 3 параметра status, message и ошибки
  constructor(status, message, errors = []) {
    // В результате вызова super(message) вызывается конструктор базового класса Error
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }

  // ошибка на стороне клиента
  static BadRequest(message, errors = []) {
    // просто создаем экземпляр ApiError и возвращаем его
    return new ApiError(400, message, errors);
  }
}
