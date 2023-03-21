import ChangePassword from '@/components/forms/change_password/ChangePassword';
import PersonalInfo from '@/components/forms/persona_iInfo/PersonalInfo';
import Box from '@mui/material/Box';
import * as React from 'react';
import styles from './Settings.module.sass';

export interface ISettings {
  userType: string;
}

const Settings: React.FC<ISettings> = ({ userType }) => {
  // const router = useRouter();

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.container}>
        <Box className={styles.personalInfoContainer}>
          <PersonalInfo userType={userType} />
        </Box>
        <Box className={styles.changePasswordContainer}>
          <ChangePassword userType={userType} />
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
