import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useContext } from "react";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import SelectAutoWidth from "./SelectAutoWidth.js";
import MultipleSelect from "../uploading-image/MultipleSelect.js";
import { Context } from "../../App.jsx";
import { observer } from "mobx-react-lite";
import backgroundImage from "../../assets/album_background.jpg";
function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
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
const CardsPerPage = 6;

const Album = observer(() => {
  const { store } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    store.getPhotoInSelectedAlbum();
  }, [store.selectedAlbum]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * CardsPerPage;
  const endIndex = startIndex + CardsPerPage;
  const currentCards = store.photosInSelectedAlbum.slice(startIndex, endIndex);

  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [openModalAlbom, setOpenModalAlbom] = useState(false);

  return (
    <ThemeProvider theme={defaultTheme} >
      <main>
        <Box
          sx={{
            bgcolor: "black",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="white"
              background-color="lightgrey"
              gutterBottom
            >
              Альбом Друзей
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
               variant="contained"
               sx={{ bgcolor: "white", color: "black", "&:hover": { backgroundColor: "white" } }}
               onClick={() => {
                 setOpenModalAlbom(true);
               }}
             >
               Добавить фото в альбом
             </Button>
              <SelectAutoWidth />
            </Stack>
          </Container>
        </Box>
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover", 
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            maxWidth: "100%",
            height: "auto",
            backgroundColor: "transparent",
          }}
         >
        <Container  sx={{ py: 8}} maxWidth="md">
          
          <Grid container spacing={4} style={{}}>
            {currentCards.map((photo) => (
              <Grid item key={photo.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: "100%",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat", 
                    }}
                    image={photo.url}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {photo.title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ bgcolor: "white", color: "black" }}
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedImage(photo.url);
                      }}
                    >
            

                      Посмотреть
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Stack sx={{ marginTop: 2 }} direction="row" justifyContent="center">
            <Pagination
              count={Math.ceil(
                store.photosInSelectedAlbum.length / CardsPerPage
              )}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
          <Dialog open={openModal} onClose={() => setOpenModal(false)}>
            <DialogContent>
              <img
                src={selectedImage}
                alt="Изображение"
                style={{
                  width: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                }}
              />
            </DialogContent>
          </Dialog>
          <Dialog
            open={openModalAlbom}
            onClose={() => setOpenModalAlbom(false)}
          >
            <DialogContent>
              <h2
                style={{ fontSize: "25px", fontFamily: "'Arial', sans-serif" }}
              >
                Добавление Фото в Альбом PS. (можно добавить фото в несколько
                альбомов)
              </h2>
              <MultipleSelect />
            </DialogContent>
          </Dialog>
        </Container>
        </div>
      </main>
      <Box
       sx={{
         bgcolor: "black",
         color: "white",
         p: 6,
         mt: 'auto',
       }}
       component="footer"
     >
     <Typography variant="h6" align="center" gutterBottom>
       Мы Семья!
     </Typography>
     <Copyright />
     </Box>
</ThemeProvider>
  );
});

export default Album;