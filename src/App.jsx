import { Route, Routes } from "react-router-dom";

import CustomTabPanel from "./components/about_team/CustomTabPanel";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
// импортируем хранилище
import Store from "./store/store";
//Мои страницы  авторизация и регистрация
import RegistrationAndAuth from "../src/pages/RegistrationAndAut";

import { createContext } from "react";
// import Login from "./auth/LoginPage";
import CalendarComponent from "./Events/calendar-event/MonthlyEventitemsx";
// подключаем наш store
const store = new Store();
// создаем контекст
export const Context = createContext({
  store,
});

function App() {
  return (
    <Context.Provider
      value={{
        store,
      }}
    >
      <Routes>
        {/* код для первой страницы регистрация / авторизация */}
        <Route path="/" element={<RegistrationAndAuth />} />

        {/* Роут главной страницы */}
        <Route path="/овощи-фрукты" element={<HomePage />} />

        <Route path="/modal" element={<CustomTabPanel />} />
        <Route path="/События" element={<Dashboard />} />
        <Route path="/calendar" element={<CalendarComponent />} />
      </Routes>
    </Context.Provider>
  );
}

export default App;
