import CustomModel from '@/common/modal/Modal';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface IInfoModalSignInSignUP {
  isOpenLogIn: boolean;
  handleClick: () => void;
}

const InfoModalSignInSignUP: React.FC<IInfoModalSignInSignUP> = ({
  isOpenLogIn,
  handleClick,
}) => {
  const router = useRouter();

  return (
    <CustomModel isOpen={isOpenLogIn} handleClick={handleClick}>
      <Box
        sx={{
          position: 'relative',
          margin: '0 auto',
          padding: '55px',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '20px',
          border: 'none',
          zIndex: '100',
        }}
      >
        <Box
          style={{
            color: '#000000',
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontFamily: 'sans-serif',
            cursor: 'pointer',
          }}
          onClick={handleClick}
        >
          &times;
        </Box>
        <Typography
          id="modal-modal-title"
          sx={{
            fontFamily: 'Poppins, sens-serif',
            fontWeight: 500,
            fontSize: '32px',
            color: '#000000',
            textAlign: 'center',
            mt: '30',
            mb: '43px',
          }}
        >
          Proceed to checkout
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                fontFamily: 'Poppins, sens-serif',
                fontWeight: 500,
                fontSize: '16px',
                color: '#000000',
                mb: '22px',
              }}
            >
              I’m new here
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                fontFamily: 'Inter, sens-serif',
                fontWeight: 600,
                fontSize: '16px',
                color: '#ffffff',
                width: '298px',
                height: '56px',
                borderRadius: '8px',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#222CDF',
                },
              }}
              onClick={() => router.push('/sign_up/coach_student')}
            >
              Create an account
            </Box>
          </Box>
          <Box
            sx={{
              margin: 'auto 50px',
              height: '100%',
              borderRight: '1px solid #D5D5D5',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                fontFamily: 'Poppins, sens-serif',
                fontWeight: 500,
                fontSize: '16px',
                color: '#000000',
                mb: '22px',
              }}
            >
              I already have athlete account
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                fontFamily: 'Inter, sens-serif',
                fontWeight: 600,
                fontSize: '16px',
                color: '#ffffff',
                width: '298px',
                height: '56px',
                borderRadius: '8px',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#222CDF',
                },
              }}
              onClick={() => router.push('/sign_in/student')}
            >
              Log in
            </Box>
          </Box>
        </Box>
      </Box>
    </CustomModel>
  );
};

export default InfoModalSignInSignUP;
