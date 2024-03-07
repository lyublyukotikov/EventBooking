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
