import { UserType } from '@/store/types/user';
import { Box, Link, Typography } from '@mui/material';
import * as React from 'react';

import style from './Confirmation.module.sass';

export interface IConfirmation {
  title: string;
  userType: string;
}

const Confirmation: React.FC<IConfirmation> = ({ title, userType }) => {
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
          <Link
            className={style.link}
            href={`${
              userType === UserType.coach
                ? '/sign_in/coach'
                : '/sign_in/student'
            } `}
          >
            Log in
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Confirmation;
