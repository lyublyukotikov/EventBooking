import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AddressForm from './AddressForm';
import TimeForm from './TimeForm';
import Review from './Review';
import { Context } from "../../App.jsx";
import { observer } from 'mobx-react-lite';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const steps = ['Заполни данные о мероприятии', 'Выбери промежуток времени когда событие будет происходить', 'Проверь всю информацию'];

const Checkout = observer(() => {
  // Состояние для хранения id созданного пользователем 
  const [createdEventId, setCreatedEventId] = React.useState<number | null>(null);
  //храним ин
  const [userEmail, setUserEmail] = React.useState<string>("");
  // Состояние для серверных ошибок 
  const [serverErrors, setServerErrors] = React.useState<any[] | null>(null);
  
  // Используем хук useContext чтобы передать туда контекст
  const { store } = React.useContext(Context);

  const [activeStep, setActiveStep] = React.useState(0);
  const isMobile = useMediaQuery('(max-width:620px)');

  // стили для степера 
  const stepperStyles = {
    paddingTop: "60px",
    paddingBottom: "90px",
    color: "black",
    display: "flex", // Значение по умолчанию

  };
  // При ширине экрана менее 620px переключаем display на block
if (isMobile) {
  stepperStyles.display = "block";
  stepperStyles.paddingBottom = "20px"
}
  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      const eventData = {
        ...addressData,
        ...timeData,
      };

      try {
        // передаю в сервис 
        const eventIdEmailUser = await store.createEvent(eventData);
        setActiveStep(activeStep + 1);
        // Записываем id события 
        setCreatedEventId(eventIdEmailUser.id);
        setUserEmail(eventIdEmailUser.userEmail);
      } catch (error) {
        setServerErrors(error.response.data.errors);
        console.error('Error creating event:', error);
        if (error.response && error.response.status === 400 && error.response.data.errors) {
          setActiveStep(activeStep + 1);
          // Если есть ошибки от сервера, записываем их в состояние
          setServerErrors(error.response.data.errors);
        }
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // Храним состояние информации из компонента адрессной формы
  const [addressData, setAddressData] = React.useState({});
  // Храним состояние информации из компонента временной формы 
  const [timeData, setTimeData] = React.useState({});

  // Функции для обновления состояния данных при изменении форм 
  const handleAddressDataChange = (data) => {
    setAddressData(data);
  };

  const handleTimeDataChange = (data) => {
    setTimeData(data);
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm onDataChange={handleAddressDataChange} />;
      case 1:
        return <TimeForm onDataChange={handleTimeDataChange} />;
      case 2:
        return <Review addressData={addressData} timeData={timeData} />;
      default:
        throw new Error('Unknown step');
    }
  }
  const darkTheme = createTheme({
    palette: {
      
      primary: {
        main: '#000',
      },
      action: {
        active: '#ffffff', 
        hover: 'rgba(255, 255, 255, 0.08)', 
        selected: 'rgba(255, 255, 255, 0.16)', 
      },
    },
  });
  
  return (
    <ThemeProvider theme={darkTheme}>
      <React.Fragment>
        <CssBaseline />
        <div className='Container' style={{ marginTop: "5%", marginBottom: "5%", paddingTop: "30px", paddingBottom: "30px", paddingLeft: "30px", paddingRight: "30px", marginLeft: "2%", marginRight: "2%" }}>
  
          <Typography component="h1" variant="h4" align="center">
            Форма создания событий
          </Typography>
          <Stepper activeStep={activeStep} sx={stepperStyles}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
  
          {activeStep === steps.length ? (
            <React.Fragment>
              {serverErrors && (
                <div>
                  <Typography variant="h5" gutterBottom>
                    Ошибка при создании события:
                  </Typography>
                  {Array.isArray(serverErrors) ? (
                    serverErrors.map((error, index) => (
                      <div key={index}>{error.msg}</div>
                    ))
                  ) : (
                    <div>{serverErrors.msg}</div>
                  )}
                </div>
              )}
              <Typography variant="h5" gutterBottom>
                <div>
                  {createdEventId !== null && `Событие ${createdEventId} создано, пользователь создал событие ${userEmail} `}
                </div>
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1, color: "black" }}>
                    Назад
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Отправить' : 'Далее'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    </ThemeProvider>
  );
});

 export default Checkout;