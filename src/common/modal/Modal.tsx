/* eslint-disable no-unused-vars */
import { Box, Modal } from '@mui/material';
import * as React from 'react';

// eslint-disable-next-line no-unused-vars
export interface ISignUp {
  children?: any;
  isOpen: boolean;
}

const CustomModel: React.FC<ISignUp> = ({ children, isOpen }) => {
  return (
    <Modal
      open={isOpen}
      onClose={() => console.log('Load false')}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        margin: '15% auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '20px',
          zIndex: '100',
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModel;
