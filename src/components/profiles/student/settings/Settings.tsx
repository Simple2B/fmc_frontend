import Box from '@mui/material/Box';
import * as React from 'react';
import ChangePassword from './forms/ChangePassword';
import PersonalInfo from './forms/PersonalInfo';
import styles from './Settings.module.sass';

export interface ISettings {}

const Settings: React.FC<ISettings> = () => {
  // const router = useRouter();

  return (
    <Box className={styles.wrapper}>
      <Box
        sx={{
          mt: '28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: '998.27px',
            p: '23px 60px',
            boxShadow: '0px 0px 15px rgba(199, 199, 199, 0.25)',
            borderRadius: '8px',
          }}
        >
          <PersonalInfo />
        </Box>
        <Box sx={{ maxWidth: '998.27px', p: '23px 60px' }}>
          <ChangePassword />
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
