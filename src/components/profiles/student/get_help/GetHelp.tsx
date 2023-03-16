import Box from '@mui/material/Box';
import * as React from 'react';
import styles from './GetHelp.module.sass';

export interface IGetHelp {}

const GetHelp: React.FC<IGetHelp> = () => {
  // const router = useRouter();

  return <Box className={styles.wrapper}>Get Help</Box>;
};

export default GetHelp;
