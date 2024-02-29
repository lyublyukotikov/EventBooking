import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

export default function Review({ addressData, timeData }) {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Проверьте заполненные данные перед отправкой!
      </Typography>
      <List disablePadding>
      <ListItem>
          <ListItemText primary={`Название События: ${addressData.eventName}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Имя: ${addressData.organizerFirstName}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Фамилия: ${addressData.organizerLastName}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`О событии: ${addressData.eventDescription}`}
            primaryTypographyProps={{
              
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Адрес: ${addressData.eventAddress}`} />
        </ListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Время и Дата:
          </Typography>
          <List disablePadding>
            <ListItem>
              <ListItemText
                primary={`Время проведения мероприятия: ${timeData.eventStartTime}- ${timeData.eventEndTime}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Первый вероятный день проведения мероприятия: ${timeData.firstProbableDate}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Последний вероятный день проведения мероприятия: ${timeData.lastProbableDate}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Удобная для вас дата: ${timeData.convenientDate}`}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

