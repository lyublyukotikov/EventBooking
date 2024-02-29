// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Высота на весь экран
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Прозрачный фон, чтобы было видно, что экран затемнен
      }}
    >
      <CircularProgress 
      sx={{
        color: 'black', // Задайте нужный цвет для значка
      }}
      />
    </Box>
  );
}
