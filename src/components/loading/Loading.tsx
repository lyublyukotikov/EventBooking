import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingIndicator = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',height:'100px' }}>
      <CircularProgress  style={{color:'white'}}/>
    </div>
  );
};

export default LoadingIndicator;