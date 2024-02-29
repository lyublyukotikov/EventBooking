import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Context } from "../../App.jsx";
import { useContext} from "react";
export default function TimeForm({ onDataChange }) {
  // используем хук useContext чтобы передать туда контекст
  const { store } = useContext(Context);

  const [formData, setFormData] = React.useState({
    firstProbableDate: '',
    eventStartTime: '',
    lastProbableDate: '',
    eventEndTime: '',
    convenientDate: '',
  });

  const calculateLastProbableDate = (startDate: string) => {
    const start = new Date(startDate);
  
    // Проверяем, является ли start корректной датой
    if (!isNaN(start.getTime())) {
      const twoWeeksLater = new Date(start);
      twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
      return twoWeeksLater.toISOString().split('T')[0];
    } else {
      return ''; // Возвращаем пустую строку или другое значение по умолчанию в случае ошибки
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "firstProbableDate") {
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value,
        lastProbableDate: calculateLastProbableDate(event.target.value),
      }));
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  // уведомляем родительский компонент об изменениях в форме 
  React.useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange, store]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Заполните информацию о времени, для мероприятия и выберите подходящий для себя день
      </Typography>
      <form>
        <div style={{ paddingBottom: '30px' }}>
          *Информация о времени и дате должна быть корректной
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Первый вероятный день"
              type="date"
              id="start_date"
              name="firstProbableDate"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formData.firstProbableDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Начало события *в любой день время начала будет такое"
              type="time"
              id="start-time"
              name="eventStartTime"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formData.eventStartTime}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Последний вероятный день"
              type="date"
              id="end-date"
              name="lastProbableDate"
              InputLabelProps={{ shrink: true }}
              value={formData.lastProbableDate}
              onChange={handleChange}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Конец события *в любой день время конца будет такое"
              type="time"
              id="end-time"
              name="eventEndTime"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formData.eventEndTime}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Удобная для вас дата"
            type="date"
            id="convenient-date"
            name="convenientDate"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formData.convenientDate}
            onChange={handleChange}
            inputProps={{
              min: formData.firstProbableDate,
              max: formData.lastProbableDate,
            }}
          />
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}