import React, { useState, useEffect, useContext } from "react";
import Accordion from "@mui/material/Accordion";
import Modal from "@mui/material/Modal";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Context } from "../../App.jsx";
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import LoadingIndicator from '../../Loading/CircularIndeterminate.jsx';
import { Stack } from '@mui/system';
const MyPosts = observer(() => {
  const { store } = useContext(Context);
  //Стейты для хранения информации об открытии/закрытии окна удаления и хранения события которое удалить 
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
   //Стейты для хранения информации об открытии/закрытии окна удаления и хранения брони которое удалить 
   const [showDeleteBooking, setShowDeleteBooking] = useState(false);
    // состояине загрузки
  const [isLoading, setIsLoading] = useState(false);
   const [bookingToDelete, setBookingToDelete] = useState(null);

   useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await store.getAllEventsByUser();
        await store.getBookingsByUserId();

       
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [store]);

// обработчик на кнопку удалить осбытие 
  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setShowDeleteConfirmation(true);
  };
  // обработчик на кнопку удалить бронь
  const handleDeleteBookingClick = (booking) => {
    setBookingToDelete(booking);
    setShowDeleteBooking(true);
  };



  // удаление события 
  const handleConfirmDelete = async () => {
    try {
      setIsLoading(true);

      await store.deleteEvent(eventToDelete.id);
      await store.getAllEventsByUser();
    } catch (error) {
      console.error('Ошибка при удалении события:', error);
    } finally {
      setIsLoading(false);
      setShowDeleteConfirmation(false);
      setEventToDelete(null);
    }
  };
  // удаление брони
  const handleDeleteBooking = async () => {
    try {
      setIsLoading(true);

      const bookingData = {
        eventId: bookingToDelete.EventId,
        date: bookingToDelete.date,
      };

      await store.deleteBookingByData(bookingData);
      await store.getBookingsByUserId();
    } catch (error) {
      console.error('Error deleting booking', error);
    } finally {
      setIsLoading(false);
      setShowDeleteBooking(false);
      setBookingToDelete(null);
    }
  };


// закрытия окна удаления 
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setEventToDelete(null);
  };
  // закрытия окна удаления брони 
  const handleCancelBookingDelete = () => {
    setShowDeleteBooking(false);
    setBookingToDelete(null);
  };



// форматирование даты для отображения пользователю 
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString("ru-RU", options);
    return formattedDate;
  };

  return (
    <div className="contaner">
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white' }}>
          <LoadingIndicator />
        </div>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '1600px',
              marginTop: '40px',
              marginLeft: '3%',
              marginRight: '3%',
            }}
          >
            <Box
              sx={{
                border: 1,
                borderRadius: 8,
                padding: 2,
                marginBottom: 2,
              }}
            >
              <Typography variant="h4">
                Ваши события:
              </Typography>
            </Box>
  
            {store.eventsById.length > 0 ? (
              store.eventsById.slice().reverse().map((event) => (
                <Paper
                  key={event.id}
                  elevation={3}
                  sx={{
                    marginBottom: '20px',
                    borderRadius: '16px',
                    padding: '16px',
                    opacity: "0.9",
                  }}
                >
                  <Accordion>
                    <AccordionSummary
                     expandIcon={<ExpandMoreIcon style={{ fontSize: '40px',color:"white" }}  />}
                      aria-controls={`panel${event.id}-content`}
                      id={`panel${event.id}-header`}
                      sx={{
                        backgroundColor: 'black',
                        borderRadius: '16px',
                        color:'white',
                       
                      }}
                    >
                      <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                        {`Событие #${event.id}: ${event.organizerFirstName} ${event.organizerLastName},почта создателя: ${event.userEmail} `}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        <div style={{ marginBottom: '12px', marginTop: '12px' }}>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteClick(event)}
                          >
                            Удалить событие
                          </Button>
                        </div>
                        <Typography variant="body1" sx={{ marginBottom: '12px' }}>
                          <strong>Информация о событии:</strong> {event.eventDescription}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Событие:</strong> {event.eventName}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Время проведения мероприятия:</strong> {event.eventStartTime} - {event.eventEndTime}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Первый вероятный день проведения мероприятия:</strong> {formatDate(event.firstProbableDate)}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Последний вероятный день проведения мероприятия:</strong> {formatDate(event.lastProbableDate)}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Удобная дата:</strong> {formatDate(event.convenientDate)}
                        </Typography>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', color: 'black', marginTop: '20px', fontSize: "30px" }}>
                У вас пока нет размещенных событий.
              </Typography>
            )}
  
            <Modal open={showDeleteConfirmation} onClose={handleCancelDelete}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'white',
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                  Подтвердите удаление
                </Typography>
  
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={{ xs: 2, md: 1 }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ marginRight: { xs: 0, md: '8px' } }}
                    onClick={handleConfirmDelete}
                  >
                    Удалить
                  </Button>
                  <Button
                    style={{ backgroundColor: "black" }}
                    variant="contained"
                    onClick={handleCancelDelete}
                  >
                    Отмена
                  </Button>
                </Stack>
              </Box>
            </Modal>
          </Box>
  
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '1600px',
              marginTop: '40px',
              marginLeft: '3%',
              marginRight: '3%',
            }}
          >
            <Box
              sx={{
                border: 1,
                borderRadius: 8,
                padding: 2,
                marginBottom: 2,
              }}
            >
              <Typography variant="h4">
                Удобные дни для участия в событиях
              </Typography>
            </Box>
  
            {store.bookingsDateByUserId?.event?.length > 0 ? (
              store.bookingsDateByUserId?.event?.map((booking) => (
                <Paper
                  key={booking.id}
                  elevation={3}
                  sx={{
                    marginBottom: '20px',
                    borderRadius: '16px',
                    padding: '16px',
                  }}
                >
                  <Accordion>
                    <AccordionDetails>
                      <div>
                        <div style={{ marginBottom: '12px', marginTop: '12px' }}>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteBookingClick(booking)}
                          >
                            Исключить день
                          </Button>
                        </div>
  
                        <Typography variant="body1">
                          <strong> Для События:</strong> {booking?.EventId}
                        </Typography>
  
                        <Typography variant="body1">
                          <strong>Мне удобно в этот день:</strong> {formatDate(booking?.date)}
                        </Typography>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', color: 'black', marginTop: '20px', fontSize: "30px" }}>
                Вы не участвуете в событиях
              </Typography>
            )}
  
            <Modal open={showDeleteBooking} onClose={handleCancelBookingDelete}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'white',
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                  Подтвердите удаление
                </Typography>
  
                <Stack
                  sx={{
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ width: { xs: '100%', md: 'auto' } }}
                    onClick={handleDeleteBooking}
                  >
                    Удалить
                  </Button>
                  <Button
                    style={{ backgroundColor: 'black' }}
                    variant="contained"
                    sx={{ width: { xs: '100%', md: 'auto' } }}
                    onClick={handleCancelBookingDelete}
                  >
                    Отмена
                  </Button>
                </Stack>
              </Box>
            </Modal>
          </Box>
        </>
      )}
    </div>
  );
});

export default MyPosts;