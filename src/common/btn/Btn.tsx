import { Box } from '@mui/material';
import * as React from 'react';
import style from './Btn.module.sass';

// eslint-disable-next-line no-unused-vars
export interface IBtn {
  text: string;
}

const Btn: React.FC<IBtn> = ({ text }) => {
  return <Box className={style.wrapper}>{text}</Box>;
};

export default Btn;
