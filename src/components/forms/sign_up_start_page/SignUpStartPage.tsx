import { Box } from '@mui/material';
import * as React from 'react';
import SignUpStartPageCard from './card/SignUpStartPageCard';
import style from './SignUpStartPage.module.sass';

// eslint-disable-next-line no-unused-vars
export interface ISignUpStartPage {}

const SignUpStartPage: React.FC<ISignUpStartPage> = () => {
  return (
    <Box className={style.wrapper}>
      <SignUpStartPageCard
        title={'I AM A COACH'}
        description={'I want to train and get paid easily.'}
        href={'/sign_up/coach'}
      />
      <Box className={style.orBox}> or </Box>
      <SignUpStartPageCard
        title={'I AM A STUDENT'}
        description={'I want to discover a coach and schedule a training.'}
        href={'/sign_up/student'}
      />
    </Box>
  );
};

export default SignUpStartPage;
