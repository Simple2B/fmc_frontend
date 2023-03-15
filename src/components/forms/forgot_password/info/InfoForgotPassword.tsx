/* eslint-disable no-unused-vars */
import { UserType } from '@/store/types/user';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import style from './InfoForgotPassword.module.sass';

// eslint-disable-next-line no-unused-vars
export interface IInfoForgotPassword {
  userType: string;
}

const InfoForgotPassword: React.FC<IInfoForgotPassword> = ({ userType }) => {
  const { query } = useRouter();
  console.log('====================================');
  console.log('[InfoForgotPassword] query => ', query);
  console.log('====================================');
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
        <Typography className={style.title}>Check your email!</Typography>
        <Box sx={{ pt: '28px', pb: '10px' }}>
          <Box className={style.description}>
            Instructions to reset your password have been sent to
            findmycoach@gmail.com
          </Box>
          <Box
            className={style.description}
            sx={{ display: 'flex', mt: '9px' }}
          >
            <Typography sx={{ pr: '7px' }}>Don’t receive an email?</Typography>
            {/* TODO: add logic to resend link - change password */}
            <Link href={'#Resend'}>Resend</Link>
          </Box>
        </Box>
        <Box
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
            Back to sign in
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoForgotPassword;
