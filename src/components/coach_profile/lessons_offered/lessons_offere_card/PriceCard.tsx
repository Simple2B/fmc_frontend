import CustomModel from '@/common/modal/Modal';
import { UserType } from '@/store/types/user';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import Schedule from '../../about_coach_profile/_Schedule';

const testData = [
  {
    title: '1 hours',
    value: '$65',
    disable: false,
  },
  {
    title: '3 hours',
    value: '$180',
    subTitle: 'You save 30$',
    disable: true,
  },
  {
    title: '6 hours',
    value: '$360',
    subTitle: 'You save 30$',
    disable: true,
  },
];

export interface IPriceCard {
  isLogIn: boolean | null;
  userType: string | null;
}

const PriceCard: React.FC<IPriceCard> = ({ isLogIn, userType }) => {
  const router = useRouter();
  const coachUuid = router.query.uuid_coach;

  const [isOpenLogIn, setIsOpenLogIn] = useState<boolean>(false);

  const [isBookSession, setIsBookSession] = useState<boolean>(false);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
      gap={1}
    >
      {testData.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0px 0px 5px rgba(114, 112, 112, 0.25)',
              borderRadius: '10px',
              p: '50px 28px',
            }}
          >
            {item.subTitle && (
              <Box
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  fontWeight: '400',
                  color: 'rgba(0, 0, 0, 0.87)',
                  position: 'absolute',
                  top: '-13px',
                  p: '5px 15px',
                  backgroundColor: 'rgba(240, 85, 71, 0.29)',
                  borderRadius: '8px',
                }}
              >
                {item.subTitle}
              </Box>
            )}
            <Box
              sx={{
                width: '100%',
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                color: '#394454',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pb: '18px',
              }}
            >
              {item.title}
            </Box>
            <Box
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '28px',
                fontWeight: '600',
                color: '#F05547',
                pb: '30px',
              }}
            >
              {item.value}
            </Box>
            <Box
              sx={{
                fontFamily: 'Work Sans, sans-serif',
                fontWeight: 600,
                fontSize: '18px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: '13px 19px',
                borderRadius: '7px',
                color: '#ffffff',
                backgroundColor: item.disable ? 'grey' : '#1976d2',
                cursor: 'pointer',
                transition: 'ease-in-out 0.3s all',
                '&:hover': {
                  backgroundColor: item.disable ? 'grey' : '#222CDF',
                  transition: 'ease-in-out 0.3s all',
                },
              }}
              onClick={() => {
                if (!isLogIn) {
                  setIsOpenLogIn(true);
                }
                if (isLogIn && userType === UserType.student) {
                  setIsBookSession(true);
                }
              }}
            >
              Select
            </Box>
          </Box>
        );
      })}

      {isOpenLogIn && (
        <CustomModel
          isOpen={isOpenLogIn}
          handleClick={() => setIsOpenLogIn(!isOpenLogIn)}
        >
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
              onClick={() => setIsOpenLogIn(!isOpenLogIn)}
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
            </Box>
          </Box>
        </CustomModel>
      )}

      {isBookSession && (
        <CustomModel
          isOpen={isBookSession}
          handleClick={() => setIsBookSession(!isBookSession)}
        >
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
              onClick={() => setIsBookSession(!isBookSession)}
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
                <Schedule coachUuid={coachUuid} maxWidth={605} />
              </Box>
              <Box
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
              </Box>
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
      )}
    </Box>
  );
};

export default PriceCard;
