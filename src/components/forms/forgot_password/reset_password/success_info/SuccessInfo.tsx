/* eslint-disable no-unused-vars */
import { UserType } from '@/store/types/user';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';

import style from './SuccessInfo.module.sass';

// eslint-disable-next-line no-unused-vars
export interface ISuccessInfo {
  userType: string;
}

const SuccessInfo: React.FC<ISuccessInfo> = ({ userType }) => {
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
        <Typography className={style.title}>Done!</Typography>
        <Box sx={{ pt: '28px', pb: '10px' }}>
          <Box className={style.description}>
            Your password was successfully reset.
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
            Go back to log in
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SuccessInfo;
