// eslint-disable-next-line no-unused-vars
import React, { useState,useContext,useEffect } from "react";
import Accordion from "@mui/material/Accordion";

import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Paper} from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Context } from "../../App.jsx";
import { observer } from "mobx-react-lite";
import LoadingIndicator from '../../Loading/CircularIndeterminate.jsx';
const Eventsposts = observer(() =>  {
  
  // используем контекст к получению доступа к стору 
  const { store } = useContext(Context);
   // состояине загрузки
   const [isLoading, setIsLoading] = useState(false);
// useEffect чтобы отображать полученные события

useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      await store.getAllEvents();
    } catch (error) {
      console.error('Error fetching events', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, [store]);

// Функция для форматирования даты в положенный вид 
const formatDate = (dateString) => {
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString("ru-RU", options);
  return formattedDate;
};
return isLoading ? (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <LoadingIndicator />
  </div>
) : (
  <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1600px',
        marginLeft: '3%',
        marginRight: '3%',
        marginTop: '40px',
      }}
    >
      {store.events.slice().reverse().map((event) => (
        <Paper
          key={event.id}
          elevation={3}
          sx={{
            marginBottom: '20px',
            borderRadius: '16px',
            padding: '16px',
          }}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${event.id}-content`}
              id={`panel${event.id}-header`}
              sx={{
                backgroundColor: 'rgb(240, 240, 240)',
                borderRadius: '16px',
              }}
            >
              <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                {`Событие #${event.id}: ${event.organizerFirstName} ${event.organizerLastName},почта создателя: ${event.userEmail} `}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
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
                  <strong>Последний вероятный день проведения мероприятия:</strong>  {formatDate(event.lastProbableDate)}
                </Typography>
                <Typography variant="body1">
                  <strong>Удобная дата:</strong>  {formatDate(event.convenientDate)}
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        </Paper>
      ))}
    </Box>
  </>
);
});
export default Eventsposts;
