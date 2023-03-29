/* eslint-disable no-unused-vars */
import { Box, Modal } from '@mui/material';
import * as React from 'react';

// eslint-disable-next-line no-unused-vars
export interface ICustomModel {
  children?: any;
  isOpen: boolean;
  handleClick?:
    | ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
}

const CustomModel: React.FC<ICustomModel> = ({
  children,
  isOpen,
  handleClick,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '20px',
          border: 'none',
          zIndex: '100',
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModel;
