import ApiError from "../exceptions/api-error.js";
// мой middleware обрабатывает ошибки из класса ApiError и возвращает на клиент ошибку сообщение о ней 
// Логирование ошибок

// То есть связующее звено по показыванию ошибок 
// между сервером и клиентом 
export default function (err, req, res, next) {
  // выводим ошибку 
  console.log(err);
  // если ошибка является эксземпляром класса ApiEror тогда мы возвращаем 
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  // Выводим непредвиденную ушибку то есть ошибка когда что то сломалось на сервере 
  return res.status(500).json({ message: "Непредвиденная ошибка" });
}
