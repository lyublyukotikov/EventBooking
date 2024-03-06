/* eslint-env node */

import nodemailer from "nodemailer";
import { config } from 'dotenv';
config();

const SMTP_PORT = process.env.SMTP_PORT ;
const SMTP_HOST = process.env.SMTP_HOST ;
const SMTP_USER = process.env.SMTP_USER ;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD ;
const VITE_API_URL =  process.env.VITE_API_URL ;
const  VITE_CLIENT_URL =process.env.VITE_CLIENT_URL
console.log("VITE_API_URL:", VITE_API_URL);
console.log("VITE_CLIENT_URL:", VITE_CLIENT_URL);
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    console.log("VITE_API_URL:", VITE_API_URL); // Добавьте эту строку
    await this.transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: "Активация аккаунта на " + VITE_API_URL,
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

export default new MailService();