import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";
// импортируем сюда контекст
import { Context } from "../../App";
import { observer } from "mobx-react-lite";
import LoadingIndicator from "../loading/Loading";

// создаем пропс
interface LoginPageProps {
  onToggleForm: () => void;
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://vk.com/alesha__mikhailov">
        alemi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const defaultTheme = createTheme();

const login: React.FC<LoginPageProps> = observer(({ onToggleForm }) => {
  // используем хук useContext чтобы передать туда контекст
  const { store } = useContext(Context);
  //храним состояние нашей почты
  const [email, SetEmail] = React.useState<string>("");
  // храним состояние нашего пароля
  const [password, SetPassword] = React.useState<string>("");
  // Храним состояние загрузки
  const [loading, setLoading] = React.useState<boolean>(false);
  // обработчик на кнопку войти
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Устанавливаем состояние загрузки в true
    setLoading(true);

    try {
      // Вызываем store.login асинхронно
      await store.login(email, password);
    } catch (error) {
      console.error("Ошибка при входе:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "black", 
            zIndex: 9999, 
          }}
        >
          <LoadingIndicator />
        </div>
      ) : (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(../src/assets/image_auth.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "black" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Войдите используя свои данные
              </Typography>
              <Box
                onSubmit={handleSubmit}
                component="form"
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  onChange={(e) => SetEmail(e.target.value)}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Почта"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                />
                <TextField
                  onChange={(e) => SetPassword(e.target.value)}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                />
                {/* отображение ошибок при логине */}
                <div>
                  {store.loginError && (
                    <p style={{ color: "red" }}>{store.loginError}</p>
                  )}
                </div>
                {/* Кнопка для переключения на форму регистрации */}
                <button title="Создать аккаунт" onClick={onToggleForm}>
                  Создать аккаунт
                </button>
                <Button
                  title="Войти"
                  style={{ color: "white", backgroundColor: "black" }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Войти
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item></Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
});

export default login;
