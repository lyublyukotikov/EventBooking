//DTO (Data Transfer Object) — это шаблон проектирования, который представляет собой объект, используемый для передачи данных между слоями приложения. Обычно DTO создаются для передачи данных между сервером и клиентом, между разными слоями приложения, или для обмена данными между разными микросервисами.


export default class UserDto {
  email;
  id;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.is_activated;
  }
}