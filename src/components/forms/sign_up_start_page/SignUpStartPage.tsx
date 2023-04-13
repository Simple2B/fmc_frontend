import { Box } from '@mui/material';
import * as React from 'react';
import style from './SignUpStartPage.module.sass';
import SignUpStartPageCard from './card/SignUpStartPageCard';

// eslint-disable-next-line no-unused-vars
export interface ISignUpStartPage {}

const SignUpStartPage: React.FC<ISignUpStartPage> = () => {
  return (
    <Box className={style.wrapper}>
      <SignUpStartPageCard
        title={'COACH'}
        description={'Manage sessions and payments with ease'}
        href={'/sign_up/coach'}
      />
      <Box className={style.orBox}> or </Box>
      <SignUpStartPageCard
        title={'ATHLETE'}
        description={'Book and review sessions with your coach'}
        href={'/sign_up/student'}
      />
    </Box>
  );
};

export default SignUpStartPage;
