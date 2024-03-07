import { Button } from "@mui/material";
import React, { useState,useEffect,useContext } from "react";
import { Context } from "../../App";

import { observer } from "mobx-react-lite";
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoadingIndicator from '../../Loading/CircularIndeterminate.jsx';
import backgroundImage1 from "../../assets/back.png"
import backgroundImage2 from "../../assets/next.png"

// интерфейс для события 
interface Event {
  convenientDate: Date;
  end: any;
  start: any;
  date: Date;
  title: string;
}







const Calendar: React.FC = observer(() => {

  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [clickOccurred, setClickOccurred] = useState(false);
  const [selectedDaysInfo, setSelectedDaysInfo] = useState({});
  // состояине загрузки
  const [isLoading, setIsLoading] = useState(false);
  // Дополнительный стейт для хранения электронных адресов
const [dayEmails, setDayEmails] = useState({});
  // храним статус ошибок 
  const [error, setError] = useState(null);
// используем контекст для работы со стором 
  const { store } = useContext(Context);
   // Обработчик открытия модального окна 
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
// обрмаботчик закрытия модального окна
const handleDialogClose = () => {
  setOpenDialog(false);
  setSelectedDaysInfo({});
  setSelectedDays([]);
  setError(null); // Сбрасываем состояние ошибки
};



const handleAcceptParticipation = async () => {
  try {
    setIsLoading(true); // Показать загрузку перед выполнением операции
    // Формируем массив дат и id событий
    const participationData = {
      bookedDates: Object.keys(selectedDaysInfo).map((timestamp) => {
        const selectedDay = new Date(parseInt(timestamp, 10));
        const eventInfo = selectedDaysInfo[timestamp];

        // Корректируем дату для соответствия часовому поясу сервера
        const adjustedDate = new Date(selectedDay.getTime() - selectedDay.getTimezoneOffset() * 60000);

        return {
          date: adjustedDate.toISOString().slice(0, 19).replace("T", " "),
          eventId: eventInfo.id,
        };
      }),
    };

 

    // Вызываем метод стора для отправки данных на сервер
    await store.sendEventData(participationData);
    
    // После успешной отправки данных на сервер вызываем метод получения бронирований
    await store.getAllBookings();
    setIsLoading(false); // Скрыть загрузку после завершения операции

    // Закрываем диалоговое окно
    setOpenDialog(false);
    setSelectedDaysInfo({});
    setSelectedDays([]);
    setError(null); // Сбрасываем состояние ошибки
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);

    // Обработка ошибки от сервера
    if (error.response && error.response.data && error.response.data.error) {
      // Обновите состояние ошибки
      setError(error.response.data.error);
      setIsLoading(false); // Скрыть загрузку в случае ошибки
    }
    
  }
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Вызываем метод по получению всех событий
        await store.getAllEvents();
        // Вызываем метод по получению всех бронирований
        await store.getAllBookings();
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [store]);
 // Обработчик клика по дню
 const handleDayClick = (dayInfo) => {
  const { date, eventsForDay } = dayInfo;

 

  setSelectedDaysInfo((prevInfo) => ({
    ...prevInfo,
    // ключ, то есть если у дня true, значит, он выбран, значит передаем ему стиль
    [date.getTime()]: {
      id: eventsForDay[0].id, 
      title: eventsForDay[0].title,
    },
  }));

  setSelectedDays([date]);
  setSelectedDay(date);
  setClickOccurred(true);
};













const handleRemoveDay = (dayToRemove) => {
  setSelectedDaysInfo(prevInfo => {
    const updatedInfo = { ...prevInfo };
    delete updatedInfo[dayToRemove.getTime()];
    return updatedInfo;
  });
};
  
 
  // использую для отображения дней в календаре 
// использую для отображения дней в календаре 
const transformEvent = (event) => {
  const eventDate = new Date(event.convenientDate);

 

  return {
    start: new Date(event.firstProbableDate),
    end: new Date(event.lastProbableDate),
    convenientDate: eventDate,
    title: event.eventName,
    email: event.userEmail,
    organizerFirstName: event.organizerFirstName,
    organizerLastName: event.organizerLastName,
    eventStartTime: event.eventStartTime,
    eventEndTime: event.eventEndTime,
    id: event.id,
   
  };
};
  
// записываем новый массив в переменную transformedEvents
const transformedEvents = store.events.map(transformEvent);

// функция для генерации календаря
  const generateCalendar = (): JSX.Element[] => {
    const days: JSX.Element[] = [];
    const daysCount = daysInMonth(currentDate);

    for (let day =   1; day <= daysCount; day++) {
      const date: Date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dayOfWeek = getDayOfWeek(date);
      


 


// Основная функция по рендерингу цвета для каждого дня
const getDayColor = (date, events, bookings) => {
  const eventsForDay = events.filter(event => {
    const startEventDate = new Date(event.start);
    const endEventDate = new Date(event.end);
    startEventDate.setHours(0, 0, 0, 0);
    endEventDate.setHours(0, 0, 0, 0);
    return date >= startEventDate && date <= endEventDate;
  });

  const hasConvenientDate = eventsForDay.some(event => {
    const convenientEventDate = new Date(event.convenientDate);
    convenientEventDate.setHours(0, 0, 0, 0);
    return (
      convenientEventDate.getDate() === date.getDate() &&
      convenientEventDate.getMonth() === date.getMonth() &&
      convenientEventDate.getFullYear() === date.getFullYear()
    );
  });

  const emailsForDay = bookings
    .filter(booking => {
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(0, 0, 0, 0);
      return (
        bookingDate.getDate() === date.getDate() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getFullYear() === date.getFullYear()
      );
    })
    .map(booking => booking.userEmail);

  return {
    color: eventsForDay.length === 0 ? 'lightpink' : (hasConvenientDate ? 'black' : 'white'),
    hasConvenientDate,
    eventsForDay,
    emailsForDay,
  };
};

// вызов функции по получению цвета дня календаря 
const dayColor = getDayColor(date, transformedEvents, store.bookingsDate);

days.push(
  <Tooltip
    title={
      <div style={{ padding: '10px', borderRadius: '5px' }}>
        <>
          <p style={{ margin: 0, padding: '5px 0' }}>
            {dayColor.color === 'lightpink' ? 'Событий не запланировано' : 'Информация о событии'}
          </p>
          {dayColor.color !== 'lightpink' && (
            dayColor.eventsForDay.map(event => (
              <div key={event.title} style={{ margin: 0, padding: '5px 0' }}>
                <p style={{ margin: '10px 0' }}>Событие: {event.id} </p>
                <p style={{ margin: '10px 0' }}>Организатор: {event.organizerFirstName} {event.organizerLastName}</p>
                <p style={{ margin: '10px 0' }}>Начало события: {event.eventStartTime}</p>
                <p style={{ margin: '10px 0' }}>Конец события: {event.eventEndTime}</p>
              </div>
            ))
          )}
        </>
      </div>
    }
    arrow
    key={day}
  >
    <div
      style={{
        ...styles.calendarDay,
        opacity: selectedDaysInfo[date.getTime()] ? 0.3 : 1,
        backgroundColor: dayColor.color,
      }}
      onClick={() => (dayColor.color === 'black' || dayColor.color === 'white') && handleDayClick({
        date,
        eventsForDay: dayColor.eventsForDay,
        hasConvenientDate: dayColor.hasConvenientDate,
      })}
    >
      <div style={styles.containerDayDayOfWeek}>
        <div style={{ color: dayColor.color === 'black' ? 'white' : "black" }}>{day}</div>
        <div style={{ color: dayColor.color === 'black' ? 'white' : "black" }}>{dayOfWeek}</div>
      </div>
      <div style={styles.containerHowToWant}>
        {dayColor.color === 'lightpink' && (
          <div style={{ margin: 0, padding: '5px 0', fontFamily: 'inherit', fontSize: "25px" }}>
            <p>Событий не запланировано</p>
          </div>
        )}
        {(dayColor.color === 'black' || dayColor.color === 'white') && (
          <div style={{ color: dayColor.color === 'black' ? 'white' : "black" }}>
            {dayColor.eventsForDay
              .filter(event => {
                const convenientEventDate = new Date(event.convenientDate);
                convenientEventDate.setHours(0, 0, 0, 0);
                return (
                  convenientEventDate.getDate() === date.getDate() &&
                  convenientEventDate.getMonth() === date.getMonth() &&
                  convenientEventDate.getFullYear() === date.getFullYear()
                );
              })
              .map(event => (
                <div key={event.title}>
                  <div style={{ marginBottom: "10px", fontSize: "15px" }}>
                    Название События:
                  </div>
                  <div key={event.title}>{event.title}</div>
                  <div style={{ marginTop: "20px", fontSize: "15px" }}>
                    Почта создателя:
                  </div>
                  <div style={{ marginTop: "10px", marginBottom: "10px" }} key={event.email}>{event.email}</div>
                </div>
              ))}
            <div style={{ fontSize: "15px" }}>
              Людям которым удобно в этот день:
            </div>
            {dayColor.emailsForDay.map(email => (
              <div style={{ marginTop: "10px" }} key={email}>{email}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  </Tooltip>
);
}

return days;
};


  




// вычисление дней в месяце
const daysInMonth = (date: Date): number => {
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return lastDayOfMonth.getDate();
};


  // обработчик на кнопку вперед
  const nextMonth = (): void => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  // обработчик на кнопку назад
  const prevMonth = (): void => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };
//функция для показа дней недели 
  const getDayOfWeek = (date: Date): string => {
    const daysOfWeek = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];
    return daysOfWeek[date.getDay()];
  };

  const styles: Record<string, React.CSSProperties> = {
    
    calendarContainer: {
      paddingTop:"30px",
      paddingBottom:"100px",
      paddingLeft:"30px",
      paddingRight:"30px",
    
      
      
      
      
    },
    calendarHeader: {
      fontFamily: "Arial",
      fontSize: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      color: "black", 
    },
    navigate: {
      display: "flex",
      paddingBottom: "20px",
      marginLeft:"100px",
      gap: "20px",
      color:'black'
    },
    calendarDays: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
      gap: "5px",
      width: "100%",
      height: "700px",
    },
    calendarDay: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      cursor: "pointer",
      paddingLeft: "10px",
      paddingTop: "10px",
      borderRadius: "10px",
      backgroundColor: "white",
      color: "black",
      fontSize: "1rem",
      transition: "background-color 0.3s ease",
      border: "1px solid grey",
     
  
    
   
    },
   

    calendarDayHover: {
      backgroundColor: "#eee",
    },
    containerDayDayOfWeek: {
      display: "flex",
      gap: "5px",
      alignItems: "center",
    },

    arrowButton: {
      width: "40px", 
      fontSize: "1.5rem", 
    },
    containerHowToWant: {
      overflowY: "auto",
      maxHeight: "150px",
      marginTop: "10%",
     marginBottom:"10%",
      position: "relative",
      fontSize: "10",
      overflowX: "hidden",
      boxSizing: "border-box",
          },
    
  };

  

  return (
    <div style={styles.calendarContainer}>
      {isLoading ?  (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <LoadingIndicator  />
        </div>
      ) : (
        <>
          <div style={styles.calendarHeader}>
            <h2 style={{ color: "black" }}>
              {currentDate.toLocaleDateString("ru-RU", {
                month: "long",
                year: "numeric",
              })}
            </h2>
          </div>
          <div style={styles.navigate}>
            <button style={styles.arrowButton} onClick={prevMonth}>
            <img src={backgroundImage1}  />
            </button>
            <button style={styles.arrowButton} onClick={nextMonth}>
            <img src={backgroundImage2}  />
            </button>
            {selectedDays.length > 0 && (
              <div>
                <Button
                  variant="outlined"
                  sx={{ borderColor: 'black', color: 'black' }}
                  onClick={() => {
                    if (selectedDays.length > 0) {
                      handleDialogOpen();
                    }
                  }}
                >
                  Выбранные дни
                </Button>
                <Dialog open={openDialog} onClose={handleDialogClose} style={{ margin: "auto", width: "90%" }}>
                  <DialogTitle style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>Выбранные дни</DialogTitle>
                  <DialogContent>
                    {error && (
                      <div style={{ color: 'red', marginTop: '10px' }}>
                        Ошибка: {error}
                      </div>
                    )}
                    {Object.keys(selectedDaysInfo).map((timestamp) => {
                      const selectedDay = new Date(parseInt(timestamp, 10));
                      const eventInfo = selectedDaysInfo[timestamp];
                      return (
                        <div key={timestamp} style={{ marginBottom: '15px', padding: '10px', display: 'flex', alignItems: 'center', backgroundColor: '#f3f3f3' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{selectedDay.toLocaleDateString('ru-RU')}</div>
                            <div style={{ fontSize: '16px', marginTop: '5px' }}>Событие: {eventInfo.id}</div>
                            <div style={{ fontSize: '16px', marginTop: '5px' }}>Название: {eventInfo.title}</div>
                          </div>
                          <IconButton onClick={() => handleRemoveDay(selectedDay)}>
                            <CloseIcon />
                          </IconButton>
                        </div>
                      );
                    })}
                  </DialogContent>
                  <DialogActions>
                    {error ? (
                      <>
                        <Button onClick={handleDialogClose} style={{ color: 'white', backgroundColor: 'black' }}>Выйти</Button>
                        <Button onClick={handleAcceptParticipation} style={{ color: 'white', backgroundColor: 'black' }}>Принять участие</Button>
                      </>
                    ) : (
                      <Button onClick={handleAcceptParticipation} style={{ color: 'white', backgroundColor: 'black' }}>Принять участие</Button>
                    )}
                  </DialogActions>
                </Dialog>
              </div>
            )}
          </div>
          <div style={styles.calendarDays}>
            {generateCalendar()}
          </div>
        </>
      )}
    </div>
  );
});


export default Calendar;
