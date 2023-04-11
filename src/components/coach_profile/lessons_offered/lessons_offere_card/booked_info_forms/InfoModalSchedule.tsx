import CustomModel from '@/common/modal/Modal';
import Schedule from '@/components/coach_profile/about_coach_profile/schedule_column/Schedule';
import { Box } from '@mui/material';
import * as React from 'react';

export interface IInfoModalSchedule {
  isBookSession: boolean;
  handleClick: () => void;
  isLogIn: boolean | null;
  userType: string | null;
}

const InfoModalSchedule: React.FC<IInfoModalSchedule> = ({
  isBookSession,
  handleClick,
  isLogIn,
  userType,
}) => {
  return (
    <CustomModel isOpen={isBookSession} handleClick={handleClick}>
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

        <Box>
          <Box sx={{}}>
            <Box
              sx={{
                cursor: 'pointer',
                fontFamily: 'Poppins, sens-serif',
                fontWeight: 400,
                fontSize: '16px',
                color: '#000000',
                mb: '3px',
              }}
            >
              Coach John 1-on-1 Tennis Lesson
            </Box>
            <Box
              sx={{
                cursor: 'pointer',
                fontFamily: 'Poppins, sens-serif',
                fontWeight: 600,
                fontSize: '16px',
                color: '#000000',
              }}
            >
              1 hour session
            </Box>
          </Box>
          <Box sx={{ m: '23px auto', width: 605 }} flex={1}>
            <Schedule maxWidth={605} isLogIn={isLogIn} userType={userType} />
          </Box>
          {/* TODO: add for next step of project */}
          {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              mr: '31px',
              cursor: 'pointer',
              fontFamily: 'Inter, sens-serif',
              fontWeight: 600,
              fontSize: '16px',
              color: '#000000',
              borderBottom: '1px solid #000000',
            }}
            onClick={() => setIsBookSession(!isBookSession)}
          >
            Skip
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
          >
            Proceed
          </Box>
        </Box> */}
        </Box>
        {/* <Typography
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
            I already have an account
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
      </Box> */}
      </Box>
    </CustomModel>
  );
};

export default InfoModalSchedule;
