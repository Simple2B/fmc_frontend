import Input from '@/common/input/Input';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import styles from '../Settings.module.sass';

export interface IPersonalInfo {}

const PersonalInfo: React.FC<IPersonalInfo> = () => {
  // const router = useRouter();

  const [name, setName] = React.useState<string>('');
  const [errorNameMessage, setErrorNameMessage] = React.useState<string>('');
  const [isErrorName, setIsErrorName] = React.useState<boolean>(false);

  const [lastName, setLastName] = React.useState<string>('');
  const [errorLastNameMessage, setErrorLastNameMessage] =
    React.useState<string>('');
  const [isErrorLastName, setIsErrorLastName] = React.useState<boolean>(false);

  return (
    <Box
      className={styles.wrapperPersonalInfo}
      sx={{
        maxWidth: '900px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="h4" className={styles.title}>
          Personal Info
        </Typography>
        <Typography variant="subtitle1" className={styles.subtitle}>
          Update your photo and personal details here.
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            width: '421px',
            mr: '10px',
          }}
        >
          <Input
            helperText={errorNameMessage}
            isError={isErrorName}
            name={'name'}
            label={'First name'}
            value={name}
            sx={{ mt: 4 }}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value !== '') {
                setIsErrorName(false);
                setErrorNameMessage('');
              } else {
                setIsErrorName(true);
                setErrorNameMessage('First name cannot be empty');
              }
            }}
            type="text"
          />
        </Box>

        <Box
          sx={{
            width: '421px',
          }}
        >
          <Input
            helperText={errorLastNameMessage}
            isError={isErrorLastName}
            name={'lastName'}
            label={'Last name'}
            value={lastName}
            sx={{ mt: 4 }}
            onChange={(e) => {
              setLastName(e.target.value);
              if (e.target.value !== '') {
                setIsErrorLastName(false);
                setErrorLastNameMessage('');
              } else {
                setIsErrorLastName(true);
                setErrorLastNameMessage('Last name cannot be empty');
              }
            }}
            type="text"
          />
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default PersonalInfo;
