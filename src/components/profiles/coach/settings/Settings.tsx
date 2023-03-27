import ChangePassword from '@/components/forms/change_password/ChangePassword';
import PersonalInfo from '@/components/forms/persona_iInfo/PersonalInfo';
import YourProfile from '@/components/forms/your_profile/YourProfile';
import { coachProfileApi } from '@/fast_api_backend/api/usersInstance/coach/profileInstance';
import { UserType } from '@/store/types/user';

import Box from '@mui/material/Box';
import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './Settings.module.sass';

export interface ISettings {
  userType: string;
}

const Settings: React.FC<ISettings> = ({ userType }) => {
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);

  // TODO: optimize information boxes
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  console.log(' isLoad - isSuccess', isLoad, '-', isSuccess);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const googleAuth = localStorage.getItem('googleAuth');
    if (googleAuth) {
      setIsGoogleAuth(Boolean(googleAuth));
    }
  }, [isGoogleAuth]);

  const [result, setResult] = useState<{
    sports: {
      name: string;
      is_deleted: boolean;
      uuid: string;
    }[];
    filesNames: string[];
    filesUrls: string[];
    checkedAdults: boolean;
    checkedChildren: boolean;
    about: string;
    locationValuesInputs: {
      city: string;
      street: string;
      postal_code: string;
    }[];
  }>({
    sports: [],
    filesNames: [],
    filesUrls: [],
    checkedAdults: false,
    checkedChildren: false,
    about: '',
    locationValuesInputs: [{ city: '', street: '', postal_code: '' }],
  });

  console.log('[Settings ] result', result);

  const getYourProfileInfo = () => {
    const getData = async (userType: string) => {
      try {
        if (userType === UserType.coach) {
          setIsLoad(true);
          const response = await coachProfileApi.getInfoProfile();
          setResult({
            sports: response.sports.filter((sport) => !sport.is_deleted),
            filesNames: response.certificates
              .filter((certificate) => !certificate.is_deleted)
              .map(
                (certificate) =>
                  certificate.certificate_url.split('/')[
                    certificate.certificate_url.split('/').length - 1
                  ]
              ),
            filesUrls: response.certificates
              .filter((certificate) => !certificate.is_deleted)
              .map((certificate) => certificate.certificate_url),
            checkedAdults: response.is_for_adults,
            checkedChildren: response.is_for_children,
            about: response.about,
            locationValuesInputs:
              response.locations.length > 0
                ? response.locations
                : [{ city: '', street: '', postal_code: '' }],
          });

          setIsLoad(false);
          setSuccess(true);
        }
      } catch (error: any) {
        setIsLoad(false);
        console.log(`POST [your profile] error message: ${error.message}`);
        setSuccess(false);
      }
    };
    getData(userType);
  };

  useEffect(() => {
    getYourProfileInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.container}>
        <Box className={styles.personalInfoContainer}>
          <PersonalInfo userType={userType} />
        </Box>
        <Box className={styles.changeYourProfileContainer}>
          <YourProfile userType={userType} result={result} />
        </Box>
        {isGoogleAuth ? null : (
          <Box className={styles.changePasswordContainer}>
            <ChangePassword userType={userType} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Settings;
