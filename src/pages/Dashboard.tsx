// Импорт React и необходимых компонентов из библиотеки Material-UI
import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Checkout from "../Events/creacte-event/Checkout";
import Calendar from "../Events/calendar-event/MonthlyEventitemsx";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Eventsposts from "../Events/Events-posts/EventsPosts";
import MyPosts from "../Events/my-posts/MyPosts.jsx";
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import backgroundImageCalendar from "../../src/assets/aaaaaa.png";
import   backgroundImagePost from "../../src/assets/ффффф.jpg";
import   backgroundImageForm from "../../src/assets/form.jpg";
import  backgroundImageDasgBoard from "../../src/assets/my-booking.jpg"
// Ширина бокового меню
const drawerWidth: number = 240;

// Определение интерфейса для свойств AppBar
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// Стилизованный компонент AppBar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Стилизованный компонент Drawer
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));


const defaultTheme = createTheme();

// Главный компонент Dashboard
export default function Dashboard() {
  // Состояние для открытия/закрытия бокового меню
  const [open, setOpen] = React.useState(true);

  // Функция для переключения состояния бокового меню
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Состояние для отслеживания выбранного компонента
  const [selectedComponent, setSelectedComponent] = React.useState("calendar");

  // Функция для обработки клика по элементу меню и выбора соответствующего компонента
  const handleItemClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Компонент AppBar */}
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
             
              pr: "24px",
              bgcolor: "black",
              
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              События
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Компонент Drawer */}
        <Drawer   variant="permanent" open={open}>
          {/* Бургер и меню справа */}
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            {/* Иконка стрелки для скрытия бургер-меню */}
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          {/* Кнопки меню */}
          <List component="nav">
            <React.Fragment>
              <ListItemButton onClick={() => handleItemClick("Eventsposts")}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="События" />
              </ListItemButton>
              <ListItemButton onClick={() => handleItemClick("checkout")}>
                <ListItemIcon>
                <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Создать событие" />
              </ListItemButton>
              <ListItemButton onClick={() => handleItemClick("MyPosts")}>
                <ListItemIcon>
                <EventAvailableIcon />
                </ListItemIcon>
                <ListItemText primary="Мои события" />
              </ListItemButton>
            </React.Fragment>

            <Divider sx={{ my: 1 }} />
            <React.Fragment>
              <ListItemButton onClick={() => handleItemClick("calendar")}>
                <ListItemIcon>
                <DateRangeIcon />
                </ListItemIcon>
                <ListItemText primary="Календарь событий" />
              </ListItemButton>
            </React.Fragment>
          </List>
        </Drawer>
        {/* Основное содержимое */}
        <Box
  component="main"
  sx={{
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundImage: (theme) => {
      switch (selectedComponent) {
        case "calendar":
          return `url(${backgroundImageCalendar})`;
        case "checkout":
          return `url(${backgroundImageForm})`;
        case "Eventsposts":
          return `url(${backgroundImagePost})`;
        case "MyPosts":
          return `url(${backgroundImageDasgBoard})`;
        default:
          return "none";
      }
    },
    backgroundSize: "cover",
  }}
>
  <Toolbar />
  {selectedComponent === "calendar" && (
    <Calendar
      onDateClick={(date: Date) => {
      }}
      onSelectedDaysChange={(selectedDays: Date[]) => {
      }}
    />
  )}
  {selectedComponent === "checkout" && <Checkout />}
  {selectedComponent === "Eventsposts" && <Eventsposts />}
  {selectedComponent === "MyPosts" && <MyPosts />}
</Box>
        
      </Box>

        
    </ThemeProvider>
  );
}
