import { Box } from '@mui/material';
import * as React from 'react';
import Btn from '../../../../common/Btn';
import style from './SignUpStartPageCard.module.sass';

// eslint-disable-next-line no-unused-vars
export interface ISignUpStartPageCard {
  title: string;
  description: string;
}

const SignUpStartPageCard: React.FC<ISignUpStartPageCard> = ({
  title,
  description,
}) => {
  return (
    <Box className={style.wrapper}>
      <Box className={style.title}>{title}</Box>
      <Box className={style.description}>{description}</Box>
      <Box className={style.btnWrapper}>
        <Btn text={'continue'} />
      </Box>
    </Box>
  );
};

export default SignUpStartPageCard;
