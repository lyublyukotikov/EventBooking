import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import CustomTabPanel from "../about_team/CustomTabPanel";
// Библиотеки модального окна для просмотра изображения
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MultipleSelect from "../uploading-image/MultipleSelect";
import { useContext } from "react";
import { Context } from "../../App";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingIndicator from "../loading/Loading";
import backgroundImage from "../../assets/profil.png"
function ResponsiveAppBar() {
  // создаем переменную usenavigate для перенаправления в компонент регистрации и авторизации
  const navigate = useNavigate();

  // импортируем Context из нашего Store
  // используем хук useContext чтобы передать туда контекст
  const { store } = useContext(Context);

  // храним данные об открытии/закрытии модального окна участников
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Храним состояние загрузки
  const [loading, setLoading] = React.useState<boolean>(false);
  // храним данные об открытии/закрытии  модального окна добавления фото
  const [openModalAddingPhoto, setOpenModalAddingPhoto] = React.useState(false);
  const handleOpenModalAddingPhoto = () => setOpenModalAddingPhoto(true);
  const handleCloseOpenModalAddingPhoto = () => setOpenModalAddingPhoto(false);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    try {
      setLoading(true);
      await store.logout();
      await store.checkAuth();

      if (!store.isAuth) {
        navigate('/');
      }
    } catch (error) {
      console.error('Ошибка во время выхода', error);
    } finally {
      setLoading(false);
    }
  };
  const handleEventsClick = () => {
   
    if (store.isAuth) {
      const { user } = store;
       
      if (user && !user.isActivated) {
         
        alert('Ваша почта не подтверждена');
      } else {
        
        navigate('/События');
      }
    } else {
      
      navigate('/События');
    }
  };


  // открытие модального окна с участниками

  return (
    
    <AppBar position="sticky" style={{ backgroundColor: "ButtonText" }}>
      {/* Основной компонент, создающий полосу приложения */}
      {loading ? (
          <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'black', // semi-transparent background
            zIndex: 9999, // ensures the indicator is on top of other elements
          }}
        >
        <LoadingIndicator />
        </div>
      ) : (
      <Container maxWidth="xl">
        {/* Контейнер */}
        <Toolbar disableGutters>
          {/* Панель инструментов */}
          {/* Текст рядом с логотипом */}
          <Typography
            title="База"
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "sans-serif",
              fontWeight: 400,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              marginRight: "60px",
              justifyContent: "space-between",
            }}
          >
            Овощи и фрукты
          </Typography>

          {/* Иконка выпадающего списка */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              title="меню"
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            {/* Модальное окно участников нашей компании */}
            <Menu
              
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "5%",
                  marginBottom: "10%",
                  marginLeft: "5%",
                  marginRight: "5%",
                  overflow: "auto",
                 
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    bgcolor: "background.paper",
                   
                    height: "100%",
                    width:"100%"
                  }}
                >
                  
                  <CustomTabPanel />
                </Box>
              </Modal>

              <Typography
                textAlign="center"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                  padding: "15px",
                  gap: "20px",
                }}
              >
                <a title="Участники"  onClick={handleOpen}>Участники</a>
                <a title="События"   onClick={handleEventsClick}>События</a>
                <a
                  title="Загрузить фото в альбом"
                  href="#"
                  onClick={handleOpenModalAddingPhoto}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Загрузить фото в альбом
                </a>
              </Typography>
            </Menu>
          </Box>

          {/* Дополнительные элементы в зависимости от размеров экрана */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >

          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                padding: "15px",
                gap: "20px",
              }}
            >
              <a
                 title="Участники"
                style={{ color: "white", textDecoration: "none" }}
                href="#"
                onClick={handleOpen}
              >
                Участники
              </a>
              <Link
                title="События"
                to="/События"
                style={{ color: "white", textDecoration: "none" }}
              >
                События
              </Link>
              <a
                title="Загрузить фото в альбом"
                href="#"
                onClick={handleOpenModalAddingPhoto}
                style={{ color: "white", textDecoration: "none" }}
              >
                Загрузить фото в альбом
              </a>
            </Typography>
          </Box>

          {/* Иконка пользователя и его меню */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="открыть меню">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, width: "50px" }}
              >
                <img src={backgroundImage} alt="/profil" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* Модальное окно загрузки изображения в альбом  */}
              <Dialog
                open={openModalAddingPhoto}
                onClose={handleCloseOpenModalAddingPhoto}
              >
                 <div
      style={{
        width: "30px",
        fontSize: "25px",
        display: "flex",
        justifyContent: "flex-end",
        marginLeft: "auto",
      
        marginRight: "20px", // Отступ справа
        fontWeight: "bold",
        cursor: "pointer", // Добавлено, чтобы указать, что элемент кликабелен
        textDecoration: "none", // Убирает подчеркивание для ссылки
        zIndex: 1000,
        color:"black"
      }}
      aria-label="close"
      onClick={() => handleCloseOpenModalAddingPhoto()}
    >
        &#x2715;
    </div>
                
                <DialogContent>
                  <h2
                    style={{
                      fontSize: "25px",
                      fontFamily: "'Arial', sans-serif",
                    }}
                  >
                    Добавление Фото в Альбом PS. (можно добавить фото в
                    несколько альбомов)
                  </h2>
                  {/* Форма добавления фото в альбом */}
                  <MultipleSelect />
                </DialogContent>
              </Dialog>
              <Typography
                textAlign="center"
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                  padding: "15px",
                  gap: "20px",
                }}
                 >
                 <a
                  
                   href="#"
                   onClick={handleLogout}
                   style={{ color: "black", textDecoration: "none" }}
                 >
                   Выйти из аккаунта
                 </a>
              </Typography>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      )}
    </AppBar>
  );
}
export default ResponsiveAppBar;
