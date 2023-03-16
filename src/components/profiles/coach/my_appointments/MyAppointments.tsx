import Box from '@mui/material/Box';
import * as React from 'react';
import styles from './MyAppointments.module.sass';

export interface IMyAppointments {}

const MyAppointments: React.FC<IMyAppointments> = () => {
  // const router = useRouter();

  return <Box className={styles.wrapper}>My Appointments</Box>;
};

export default MyAppointments;
