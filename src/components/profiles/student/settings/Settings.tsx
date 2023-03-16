import Box from '@mui/material/Box';
import * as React from 'react';
import styles from './Settings.module.sass';

export interface ISettings {}

const Settings: React.FC<ISettings> = () => {
  // const router = useRouter();

  return <Box className={styles.wrapper}>Settings</Box>;
};

export default Settings;
