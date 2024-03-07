import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Context } from "../../App";
import backgroundImage from "../../assets/blur.jpg"
const AccordionUsage = observer(() => {
  const { store } = React.useContext(Context);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "100px",
          paddingBottom: "120px",
          color: "rgba(0, 0, 0, 0.87)",
        }}
      >
        <Typography variant="h2" sx={{ textAlign: "start", color: "inherit" }}>
          Частые вопросы
        </Typography>

        <Typography
          variant="h5"
          sx={{
            maxWidth: "600px",
            textAlign: "start",
            color: "white",
            marginBottom: "25px",
          }}
        >
          Тут представлены самые популярные вопросы, по пользованию нашим
          web-сервисом
        </Typography>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "40px",
            }}
          >
            <Typography variant="h6" sx={{ fontSize: "24px", fontFamily: "Arial" }}>
              В чем смысл?🤔
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              fontSize: "25px",
              bgcolor: "black",
              color: "white",
            }}
          >
            В нашем сервисе вы можете:
            <ul style={{ listStyle: 'none', paddingRight: '10px', paddingLeft: '20px' }}>
              <li style={{ color: 'white', marginBottom: '10px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: '-20px', color: 'white' }}>&#8226;</span>
                Познакомиться с нашей компанией.
              </li>
              <li style={{ color: 'white', marginBottom: '10px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: '-20px', color: 'white' }}>&#8226;</span>
                Посмотреть запланированные события.
              </li>
              <li style={{ color: 'white', marginBottom: '10px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: '-20px', color: 'white' }}>&#8226;</span>
                Выбрать удобный день для проведения мероприятия.
              </li>
            </ul>
            <p style={{ color: 'white' }}>
              Пожалуйста, обратите внимание, что доступ к вкладке событий будет предоставлен только после подтверждения личности через электронную почту.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "40px",
            }}
          >
            <Typography variant="h6" sx={{ fontSize: "24px", fontFamily: "Arial" }}>
              О проекте
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              fontSize: "25px",
              bgcolor: "black",
              color: "white",
            }}
          >
            Проект был выполнен исключительно в учебных целях. Все персонажи
            являются вымышленными, и совпадения случайны. Никто не несет
            ответственности за ваши данные. Проект использует следующий стек
            технологий: React, Express.js, PostgreSQL, TypeScript.
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "40px",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "24px", fontFamily: "Arial" }}
            >
              Перейдите по ссылке, отправленной вам на почту, чтобы подтвердить
              свою личность
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              fontSize: "25px",
              bgcolor: "black",
              color: "white",
            }}
          >
            
            {store.user.isActivated
              ? "Аккаунт подтвержден ✅"
              : "Аккаунт не подтвержден ❌"}
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
});

export default AccordionUsage;
