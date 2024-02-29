import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { observer } from "mobx-react-lite";
import { useEffect, useContext, useState } from "react";
import { Context } from "../../App.jsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';
const SelectAutoWidth = observer(() => {
  const { store } = useContext(Context);
// получаем альбомы 
  useEffect(() => {
    store.getAlbums();
  }, [store]);

  const [selectedAlbum, setSelectedAlbum] = useState<string | number>(
    store.albums.length > 0 ? store.albums[0].id : ""
  );
  useEffect(() => {
    if (store.albums.length > 0) {
      setSelectedAlbum(store.albums[0].id);
      store.setSelectedAlbum(store.albums[0].id);
    }
  }, [store.albums]);
  const handleChange = (event: SelectChangeEvent) => {
    const selectedAlbumId = event.target.value;
    setSelectedAlbum(selectedAlbumId);
    store.setSelectedAlbum(selectedAlbumId);
  };
  const whiteTheme = createTheme({
    palette: {
      
      primary: {
        main: '#ffffff',
      },
      action: {
        active: '#ffffff', 
        hover: 'rgba(255, 255, 255, 0.08)', 
        selected: 'rgba(255, 255, 255, 0.16)', 
      },
    },
  });
  return (
    <ThemeProvider theme={whiteTheme}>
    <div>
      <FormControl
        sx={{ m: 1, minWidth: 200, backgroundColor: "white", color: "black" }}
      >
        <InputLabel
          id="demo-simple-select-autowidth-label"
          sx={{
            color: "grey",
            "&:hover": {
              borderColor: "white",
            },
            "&.Mui-focused": {
              borderColor: "white",
            },
          }}
        >
          Альбом
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selectedAlbum}
          onChange={handleChange}
          autoWidth
          label="Альбом"
        >
          {store.albums.map((album) => (
            <MenuItem key={album.id} value={album.id}>
              {album.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
    </ThemeProvider>
  );
});

export default SelectAutoWidth;
