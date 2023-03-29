/* eslint-disable no-unused-vars */
import { Box, Typography } from '@mui/material';
import * as React from 'react';

// eslint-disable-next-line no-unused-vars
export interface IMessageBox {
  message: string;
  handleClick?: React.MouseEventHandler<HTMLSpanElement> | undefined;
}

const MessageBox: React.FC<IMessageBox> = ({ message, handleClick }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        margin: '0 auto',
        padding: '55px',
        backgroundColor: '#151632',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '20px',
        zIndex: '100',
      }}
    >
      <Box
        onClick={handleClick}
        style={{
          color: '#fff',
          position: 'absolute',
          top: '20px',
          right: '20px',
          fontFamily: 'sans-serif',
          cursor: 'pointer',
        }}
      >
        &times;
      </Box>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ color: '#f8dcdb', textAlign: 'center' }}
      >
        {`${message}`}
      </Typography>
    </Box>
  );
};

export default MessageBox;
