// AddressForm.jsx
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function AddressForm({ onDataChange }) {
  const [formData, setFormData] = React.useState({
    eventName:'',
    organizerFirstName: '',
    organizerLastName: '',
    eventAddress: '',
    eventDescription: '',
    
  });
 
  

  
// обработчик изменений в полях 
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  
//уведомляем родительский компонент об изменениях в форме 
  React.useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);
  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Информация о мероприятии
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="eventName"
            name="eventName"
            label="Название мероприятия"
            fullWidth
            autoComplete="eventName"
            variant="standard"
            value={formData.eventName}
            onChange={handleChange}
            style={{ color: 'white' }}
            inputProps={{ maxLength: 25 }} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="organizerFirstName"
            label="Имя"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={formData.organizerFirstName}
            onChange={handleChange}
            style={{ color: 'white' }} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="organizerLastName"
            label="Фамилия"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={formData.organizerLastName}
            onChange={handleChange}
            style={{ color: 'white' }} 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="eventAddress"
            label="Адрес"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={formData.eventAddress}
            onChange={handleChange}
            style={{ color: 'white' }} 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="about_event"
            name="eventDescription"
            label="О мероприятии"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={formData.eventDescription}
            onChange={handleChange}
            style={{ color: 'white' }}
            inputProps={{ maxLength: 2000 }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
