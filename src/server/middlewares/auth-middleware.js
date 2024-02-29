import ApiError from "../exceptions/api-error.js";
import tokenService from "../service/token-service.js";

export default function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    // Если токен в заголовке не указан, пробрасываем ошибку
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];

    // Если токен отсутствует, пробрасываем ошибку
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    // Если токен есть
    const userData = tokenService.validateAccessToken(accessToken);

    // Если при валидации произошла какая-то ошибка
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    // Если все проверки пройдены, помещаем в поле user у request данные, которые вытащили
    req.user = userData;

    // Передаем управление следующему middleware
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}