import Box from '@mui/material/Box';
import * as React from 'react';
import styles from './Messages.module.sass';

interface IMessages {}

const Messages: React.FC<IMessages> = () => {
  // const router = useRouter();

  return <Box className={styles.wrapper}>Messages</Box>;
};

export default Messages;
