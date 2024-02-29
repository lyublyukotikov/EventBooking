import * as React from "react";
import Button from "@mui/material/Button";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useEffect, useContext } from "react";
import { Context } from "../../App.jsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleSelect = observer(() => {
  const theme = useTheme();
  // используем контекст к получению доступа к стору
  const { store } = useContext(Context);
  // useEffect чтобы отображать полученные альбомы
  useEffect(() => {
    store.getAlbums();
  }, [store]);

  const onClear = () => {
    if (window.confirm("Are you sure?")) {
      setFileData({ dataURL: undefined });
      setFormErrors((prevErrors) => ({ ...prevErrors, file: false }));
    }
  };

  const containerStyle: React.CSSProperties = {
    border: "2px dashed #ccc", // Используем dashed для пунктирной линии
    padding: "20px",
    marginTop: "20px",
    transition: "border-color 0.3s ease-in-out",
  };

  const noImageDroppedStyle: React.CSSProperties = {
    borderColor: "black",
  };

  const imageDroppedStyle: React.CSSProperties = {
    borderColor: "green",
  };
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

  //храним состояние которое отслеживает ошбики заполеннных полей
  const [formErrors, setFormErrors] = useState<{
    album: boolean;
    title: boolean;
    file: boolean;
  }>({
    album: false,
    title: false,
    file: false,
  });

  // храним состояние выбраного id альбома или альбомов
  const [personName, setPersonName] = React.useState<number[]>([]);

  // храним состояние названия фотографии
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  // храним состояние выбранного фото
  const [fileData, setFileData] = useState<{ file: File | undefined }>({
    file: undefined,
  });

  // Функция для обновления состояниея альбомов
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",").map(Number) : value
    );
    // добавляем ошибку если поле пустой
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      album: value.length === 0,
    }));
    // Внутри handleChange
    console.log("Form Errors after album change:", formErrors);
  };
  // Функция для обновления состояниея названия картинки
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(event.target.value);
    // добавляем ошибку если поле пустое
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      title: event.target.value.length === 0,
    }));
  };
  // функция для обновления состояния фотографии
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // извлекаем файл
    const file = e.target.files?.[0];
    // проверяем существует ли файл
    if (file) {
      // создаем новый объект
      const reader = new FileReader();
      //устанавливаем обработчик событий,который срабатывает когда операция чтения файла завершина
      reader.onloadend = () => {
        // Внутри обработчика устанавливает состояние fileData, содержащее информацию о файле и его представлении в виде Data URL
        setFileData({ file, dataURL: reader.result as string });
        // Обновляем состояние ошибок
        setFormErrors((prevErrors) => ({ ...prevErrors, file: false }));
      };

      reader.readAsDataURL(file);
    } else {
      // делаем поля undefined
      setFileData({ file: undefined, dataURL: undefined });
      // Обновляем состояние ошибок
      setFormErrors((prevErrors) => ({ ...prevErrors, file: true }));
    }
  };

  // функция добавления фотографии в альбом
  // Функция добавления фотографии в альбом
  const handleAddPhoto = () => {
    // Обновляем состояние ошибок перед проверкой
    // Обновляем состояние ошибок перед проверкой
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      album: personName.length === 0,
      title: selectedTitle.length === 0,
      file: !fileData.file,
    }));

    console.log("Form Errors:", formErrors); // Добавим вывод в консоль

    // Выполняем только при наличии ошибок
    if (Object.values(formErrors).some((error) => error)) {
      console.error("Пожалуйста, заполните все необходимые поля.");
    } else {
      store.addPhotoToAlbums(personName, selectedTitle, fileData.file);
       store.getPhotoInSelectedAlbum();
    }
  };
  return (
    <ThemeProvider theme={darkTheme}>
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        {/* инпут для выбора альбомов куда грузить фотографию  */}
        <InputLabel id="demo-multiple-name-label">Альбомы</InputLabel>

        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {store.albums.map((album) => (
            <MenuItem key={album.id} value={album.id}>
              {album.title}
            </MenuItem>
          ))}
        </Select>
        {formErrors.album && (
          <div style={{ color: "red" }}>Пожалуйста,выберите альбом</div>
        )}

        <div
          className="name-photo"
          style={{
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <label
            htmlFor="name"
            style={{ fontSize: "25px", fontFamily: "'Arial', sans-serif" }}
          >
            Название (от 4 до 30 символов):
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            minLength="4"
            maxLength="30"
            size="10"
            value={selectedTitle}
            onChange={handleTitleChange}
            style={{
              width: "200px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "20px",
            }}
          />
        </div>
        {formErrors.title && (
          <div style={{ color: "red" }}>
            Пожалуйста,выберите название фотографии
          </div>
        )}
        <div
          className="container"
          style={{ display: "block", gap: "30px", marginTop: "50px" }}
        >
          <h1 style={{ fontSize: "25px", fontFamily: "'Arial', sans-serif" }}>
            Выбор изображения:
          </h1>

          <div
            style={{
              ...containerStyle,
              ...(fileData.dataURL ? imageDroppedStyle : noImageDroppedStyle),
            }}
          >
            <div className="form-group row">
              <div className="col-md-6">
                <label className="drag-label" style={{ gap: "20px" }}>
                  Перетащи изображение на кнопку "Выберите файл"
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="btn btn-success"
                  accept="image/*"
                />
              </div>
              <div className="col-md-6">
                <img
                  style={{ height: "125px" }}
                  className="img-rounded thumb"
                  src={fileData.dataURL}
                />
                <div
                  style={{ display: !fileData.dataURL ? "block" : "none" }}
                ></div>
              </div>
            </div>
            {formErrors.file && (
              <div style={{ color: "red" }}>
                Пожалуйста, выберите изображение.
              </div>
            )}
          </div>
        </div>
      </FormControl>
      <div
        style={{
          paddingTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handleAddPhoto}
          variant="outlined"
          sx={{ borderColor: "black", color: "black" }}
        >
          Добавить
        </Button>
      </div>
    </div>
    </ThemeProvider>
  );
});

export default MultipleSelect;
