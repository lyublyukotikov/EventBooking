import nodemailer from "nodemailer";

// Порт, который взят с gmail
const SMTP_PORT = 587;
// Имя хоста взято с gmail
const SMTP_HOST = "smtp.gmail.com";  // Замените на фактический хост
// Имя пользователя для рассылки
const SMTP_USER = "eshopify532@gmail.com";
const SMTP_PASSWORD = "rqbr owcy janf ryhf"; // Обернул пароль в кавычки
// ССЫЛКА на клиент сайта 
const API_URL = "http://localhost:5000"; // Добавил кавычки вокруг URL

class MailService {
  // Создаем конструктор
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure:false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: "Активация аккаунта на " + API_URL,
      text: "",
      html: `
        <div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}

export default new MailService(); // Экспортируем экземпляр класса
