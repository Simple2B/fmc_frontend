import ChangePassword from '@/components/forms/change_password/ChangePassword';
import PersonalInfo from '@/components/forms/persona_iInfo/PersonalInfo';
import YourProfile from '@/components/forms/your_profile/YourProfile';
import Box from '@mui/material/Box';
import * as React from 'react';
import styles from './Settings.module.sass';

export interface ISettings {
  userType: string;
}

const Settings: React.FC<ISettings> = ({ userType }) => {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.container}>
        <Box className={styles.personalInfoContainer}>
          <PersonalInfo userType={userType} />
        </Box>
        <Box className={styles.changeYourProfileContainer}>
          <YourProfile userType={userType} />
        </Box>
        <Box className={styles.changePasswordContainer}>
          <ChangePassword userType={userType} />
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
