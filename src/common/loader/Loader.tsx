import { Box } from '@mui/system';
import * as React from 'react';
import style from './Loader.module.sass';

export interface ILoader {}

// eslint-disable-next-line no-empty-pattern
const Loader: React.FC<ILoader> = () => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div className={style.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Box>
  );
};

export default Loader;
