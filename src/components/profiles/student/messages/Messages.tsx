import Box from '@mui/material/Box';
import * as React from 'react';
import ChatContacts from './ChatContacts';
import ChatMessages from './ChatMessages';
import styles from './Messages.module.sass';
export interface IMessages {}

const Messages: React.FC<IMessages> = () => {
  // const router = useRouter();

  return (
    <Box alignItems={'center'} className={styles.wrapper}>
      <ChatContacts />
      <ChatMessages />
    </Box>
  );
};

export default Messages;
