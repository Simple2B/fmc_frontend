import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import Loader from '../../../../common/loader/Loader';
import MessageBox from '../../../../common/message_box/MessageBox';
import CustomModel from '../../../../common/modal/Modal';
import { coachClientApi } from '../../../../fast_api_backend/api/usersInstance/coach/coachInstance';
import { studentClientApi } from '../../../../fast_api_backend/api/usersInstance/student/studentInstance';
import { UserType } from '../../../../store/types/user';

import style from './Confirmation.module.sass';

export interface IConfirmation {
  title: string;
  userType: string;
}

const Confirmation: React.FC<IConfirmation> = ({ title, userType }) => {
  const router = useRouter();

  const [isLoad, setIsLoad] = React.useState<boolean>(false);
  const [isSuccess, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleConfirm = (e: any) => {
    e.preventDefault();
    const token = router.asPath.split('?token=')[1];
    const confirmCoachEmail = async (userType: string) => {
      setIsLoad(true);
      try {
        if (userType === UserType.coach) {
          const res = await coachClientApi.coachAccountConfirmation(token);
          setIsLoad(false);
          setSuccess(true);
          console.log('POST [/confirmation] coach successfully', res);
          router.push('/sign_in/coach');
        }
        if (userType === UserType.student) {
          const res = await studentClientApi.studentAccountConfirmation(token);
          setIsLoad(false);
          setSuccess(true);
          console.log('POST [/confirmation] student successfully', res);
          router.push('/sign_in/student');
        }
      } catch (error: any) {
        if (userType === UserType.coach) {
          console.log(
            `POST [/confirmation] coach error message: ${error.message}`
          );
          setSuccess(false);
          setError('The token is not valid, please try to register again!');
          router.push('/sign_up/coach');
        }
        if (userType === UserType.student) {
          console.log(
            `POST [/confirmation] student error message: ${error.message}`
          );
          setSuccess(false);
          // setError('The token is not valid, please try to register again!');
          setError(`${error.message}`);

          router.push('/sign_up/student');
        }
        console.log(`POST [/confirmation] error message: ${error.message}`);
      }
    };
    confirmCoachEmail(userType);
  };

  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setIsLoad(false);
        setModalIsOpen(true);
        setError(null);
      }, 1000);
    }
  }, [modalIsOpen, error]);

  return (
    <Box className={style.wrapper}>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography className={style.title}>{title}</Typography>
        <Box sx={{ pt: '23px' }}>
          <Typography className={style.description}>
            Please log in to access the system.
          </Typography>
        </Box>
        <Box
          sx={{ mt: 1, position: 'relative', width: '100%' }}
          component="form"
          onSubmit={handleConfirm}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: '8px',
              width: '100%',
              height: '56px',
            }}
          >
            Log in
          </Button>
        </Box>
      </Box>
      {isLoad && (
        <CustomModel isOpen={isLoad}>
          <Loader />
        </CustomModel>
      )}
      {error && !isSuccess && (
        <CustomModel
          isOpen={modalIsOpen}
          handleClick={() => setModalIsOpen(!modalIsOpen)}
        >
          <MessageBox
            error={error}
            handleClick={() => setModalIsOpen(!modalIsOpen)}
          />
        </CustomModel>
      )}
    </Box>
  );
};

export default Confirmation;
