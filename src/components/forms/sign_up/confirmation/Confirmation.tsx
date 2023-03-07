import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import Loader from '../../../../common/loader/Loader';
import CustomModel from '../../../../common/modal/Modal';
import { UserType } from '../../../../store/types/user';

import style from './Confirmation.module.sass';

export interface IConfirmation {
  title: string;
  userType: string;
}

const Confirmation: React.FC<IConfirmation> = ({ title, userType }) => {
  const router = useRouter();
  const token = router.asPath.split('?')[1];

  const [isLoad, setIsLoad] = React.useState<boolean>(false);

  const handleConfirm = () => {
    if (userType === UserType.coach) {
      const confirmCoachEmail = async () => {
        setIsLoad(true);
        const res = await coachClientApi.coachAccountConfirmation(token);
        console.log('====================================');
        console.log('res => ', res);
        console.log('====================================');
        if (res === 200) {
          console.log('coach: confirmCoachEmail => res', res);
          router.push('/sign_in/coach');
          setIsLoad(false);
        } else {
          console.log('coach: confirmCoachEmail => error', res);
          setIsLoad(false);
          alert(`${res}`);
        }
      };
      confirmCoachEmail();
    }

    if (userType === UserType.student) {
      const confirmStudentEmail = async () => {
        const res = await studentClientApi.studentAccountConfirmation(token);
        if (res === 200) {
          console.log('student: confirmCoachEmail => res', res);
          setIsLoad(false);
          router.push('/sign_in/student');
        } else {
          console.log('student: confirmCoachEmail => error', res);
          setIsLoad(false);
          alert(`${res}`);
        }
      };
      confirmStudentEmail();
    }
  };

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
          component="form"
          noValidate
          sx={{ mt: 1, position: 'relative', width: '100%' }}
          className={style.form}
        >
          <Box className={style.link} onClick={handleConfirm}>
            Log in
          </Box>
        </Box>
      </Box>
      {isLoad && (
        <CustomModel isOpen={isLoad}>
          <Loader />
        </CustomModel>
      )}
    </Box>
  );
};

export default Confirmation;
