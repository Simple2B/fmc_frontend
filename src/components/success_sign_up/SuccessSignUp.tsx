import { Box } from '@mui/material';
import * as React from 'react';

import style from './SuccessSignUp.module.sass';

// eslint-disable-next-line no-unused-vars
export interface ISuccessSignUp {
  email: string;
}

const SuccessSignUp: React.FC<ISuccessSignUp> = ({ email }) => {
  return (
    <Box className={style.wrapper}>
      <Box className={style.title}>Check your email</Box>
      <Box className={style.description}>
        To confirm your email address, follow the link in the Email we sent to
      </Box>
      <Box className={style.email}>{email}</Box>
      <Box className={style.info}>
        Resend Email <div className={style.arrow}>&#8593;</div>
      </Box>
    </Box>
  );
};

export default SuccessSignUp;
