import { Box } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import Btn from '../../../../common/btn/Btn';
import style from './SignUpStartPageCard.module.sass';

// eslint-disable-next-line no-unused-vars
export interface ISignUpStartPageCard {
  title: string;
  description: string;
  href: string;
}

const SignUpStartPageCard: React.FC<ISignUpStartPageCard> = ({
  title,
  description,
  href,
}) => {
  return (
    <Box className={style.wrapper}>
      <Box className={style.title}>{title}</Box>
      <Box className={style.description}>{description}</Box>
      <Box className={style.btnWrapper}>
        <Link href={href}>
          <Btn text={'continue'} />
        </Link>
      </Box>
    </Box>
  );
};

export default SignUpStartPageCard;
