import Box from '@mui/material/Box';
import * as React from 'react';
import styles from '../Settings.module.sass';

export interface IChangePassword {}

const ChangePassword: React.FC<IChangePassword> = () => {
  // const router = useRouter();

  return <Box className={styles.wrapperChangePassword}></Box>;
};

export default ChangePassword;
