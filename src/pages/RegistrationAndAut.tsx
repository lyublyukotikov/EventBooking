import React, { useContext } from "react";
// импоритруем авторизацию
import LoginPage from "../components/auth/LoginPage";
// импортируем регистарцию
import Registration from "../components/auth/RegistrationPage";
import { useState } from "react";
import { useEffect } from "react";
import { Context } from "../App";
// импортируем  observer  чтобы mox
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";


const RegistrationAndAuth = observer(() => {
  // используем хук usehistory чтобы перенаправлять на страницу регистарции не зарегистрированных пользователей
  const navigate = useNavigate();

  // по умолчанию компонент логина
  // храним состояния о регистрации или авторизации
  const [isRegistration, setIsRegistration] = useState(false);

  // если пользователь не зарегистрирован переадресовываем на окно регистрации
  const handleToggleForm = () => {
    setIsRegistration(!isRegistration);
  };

  // если пользователь уже имеет аккаунт
  const handleToggleRegistForm = () => {
    setIsRegistration(!isRegistration);
  };

  // используем хук useContext чтобы передать туда контекст
  const { store } = useContext(Context);

  // Вызываем метод checkAuth каждый раз когда пользователь заходит на сайт
  useEffect(() => {
    // Вызываем метод checkAuth при монтировании компонента
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []); // Пустой массив зависимостей означает, что useEffect будет вызываться только при монтировании

  useEffect(() => {
    // После успешного входа или регистрации перенаправляем на нужную страницу
    if (store.isAuth) {
      navigate("/овощи-фрукты"); // Укажите свой желаемый маршрут
    }
  }, [store.isAuth]); // Зависимость от store.isAuth, чтобы useEffect вызывался только при изменении isAuth

  // Функция для получения пользователей



  return (
    <div>
   
          {isRegistration ? (
            <Registration onToggleRegist={handleToggleRegistForm} />
          ) : (
            <LoginPage onToggleForm={handleToggleForm} />
          )}
        
      

    </div>
  );
});

export default RegistrationAndAuth;
