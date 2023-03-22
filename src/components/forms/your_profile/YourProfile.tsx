/* eslint-disable no-unused-vars */
import Input from '@/common/input/Input';
import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import DragDropFiles from '@/common/upload_drag_and_drop_input/DragDropFiles';
import { Close } from '@mui/icons-material';
import Textarea from '@mui/joy/Textarea';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useState } from 'react';
import styles from './YourProfile.module.sass';

const nameInputStyles = {
  mt: 4,
  '& .MuiInputBase-root': {
    position: 'relative',
  },
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '-20px',
  },
};

interface ILocation {
  city: string;
  street: string;
  postCode: string;
  icon?: any;
}

export interface IYourProfile {
  userType: string;
}

const YourProfile: React.FC<IYourProfile> = ({ userType }) => {
  const matches600 = useMediaQuery('(max-width:600px)');

  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [sport, setSport] = useState<string>('');
  const [errorSportMessage, setErrorSportMessage] = useState<string>('');
  const [isErrorSport, setIsErrorSport] = useState<boolean>(false);

  const [skills, setSkills] = useState<string>('');

  const [files, setFiles] = useState<File[]>([]);
  const [filesNames, setFilesNames] = useState<string[] | null>(null);

  const [checkedAdults, setCheckedAdults] = useState<boolean>(true);
  const [checkedChildren, setCheckedChildren] = useState<boolean>(false);

  // Location
  const [locationValuesInputs, setLocationValuesInputs] = useState<ILocation[]>(
    [
      {
        city: '',
        street: '',
        postCode: '',
      },
      {
        city: '',
        street: '',
        postCode: '',
      },
    ]
  );

  const deleteLocationInputs = (index: number) => {
    setLocationValuesInputs(
      locationValuesInputs.filter((item, ind) => ind !== index)
    );
  };

  const handleOnChange = (
    e: { target: { value: string } },
    setName: (arg0: any) => void,
    setIsErrorName: (arg0: boolean) => void,
    setErrorNameMessage: (arg0: string) => void
  ) => {
    setName(e.target.value);
    if (e.target.value !== '') {
      setIsErrorName(false);
      setErrorNameMessage('');
    } else {
      setIsErrorName(true);
      setErrorNameMessage('Sport cannot be empty');
    }
  };

  const saveProfileInfo = () => {
    if (sport === '') {
      setIsErrorSport(true);
      setErrorSportMessage('Sport cannot be empty');
    } else {
      setIsErrorSport(false);
      setErrorSportMessage('');
    }

    if (sport !== '') {
      const saveData = async (userType: string) => {
        // try {
        //   if (userType === UserType.coach) {
        //     setIsLoad(true);
        //     const response = await coachProfileApi.savePersonalInfoCoach(
        //       name,
        //       lastName,
        //       fileToSave
        //     );
        //     console.log('POST [/personal_info] coach successfully', response);
        //     setIsLoad(false);
        //     setSuccess(true);
        //   }
        //   if (userType === UserType.student) {
        //     setIsLoad(true);
        //     const response = await studentProfileApi.savePersonalInfoStudent(
        //       name,
        //       lastName,
        //       fileToSave
        //     );
        //     setIsLoad(false);
        //     setSuccess(true);
        //     console.log('POST [/personal_info] student successfully', response);
        //   }
        // } catch (error: any) {
        //   setIsLoad(false);
        //   if (userType === UserType.coach) {
        //     console.log(
        //       `POST [/personal_info] coach error message: ${error.message}`
        //     );
        //     setSuccess(false);
        //     getErrorMessage(error.message, setError);
        //   }
        //   if (userType === UserType.student) {
        //     console.log(
        //       `POST [/personal_info] student error message: ${error}`
        //     );
        //     setSuccess(false);
        //     getErrorMessage(error.message, setError);
        //   }
        //   console.log(`POST [/personal_info] error message: ${error.message}`);
        // }
      };
      saveData(userType);
    }
  };

  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setModalIsOpen(true);
        setError(null);
      }, 1000);
    }
  }, [modalIsOpen, error]);

  const closeSuccessMessage = () => {
    setModalIsOpen(!modalIsOpen);
    setSuccess(false);
    setSport('');
    setSkills('');
  };

  return (
    <Box className={styles.wrapperPersonalInfo}>
      <Box className={styles.titleSection}>
        <Typography variant="h4" className={styles.title}>
          Your profile
        </Typography>
        <Typography variant="subtitle1" className={styles.subtitle}>
          Update your profile.
        </Typography>
      </Box>
      <Box className={styles.namesSection}>
        <Box className={styles.inputBox}>
          <Input
            helperText={errorSportMessage}
            isError={isErrorSport}
            name={'sport'}
            label={'Sport'}
            value={sport}
            sx={nameInputStyles}
            onChange={(e) =>
              handleOnChange(e, setSport, setIsErrorSport, setErrorSportMessage)
            }
            type="text"
          />
        </Box>
        <Box className={styles.inputBox}>
          <Input
            name={'skills'}
            label={'Skills'}
            value={skills}
            sx={nameInputStyles}
            onChange={(e) => setSkills(e.target.value)}
            type="text"
          />
        </Box>
      </Box>
      <Box className={styles.aboutSection}>
        <Textarea
          placeholder="About"
          defaultValue="About"
          minRows={6}
          sx={{ width: '100%' }}
        />
      </Box>
      <Box className={styles.certificatesSection}>
        <Box className={styles.certificatesTitle}>
          <Typography variant="h4" className={styles.title}>
            Certificates
          </Typography>
          <Typography variant="subtitle1" className={styles.subtitle}>
            Upload your certificates.
          </Typography>
        </Box>
        <Box className={styles.uploadInputWrapper}>
          <DragDropFiles
            files={files}
            setFiles={setFiles}
            filesNames={filesNames}
            setFilesNames={setFilesNames}
          />
        </Box>
      </Box>

      <Box className={styles.sessionsSection}>
        <Box className={styles.sessionsTitle}>
          <Typography variant="h4" className={styles.title}>
            Sessions
          </Typography>
          <Typography variant="subtitle1" className={styles.subtitle}>
            Choose one or two options.
          </Typography>
        </Box>
        <Box className={styles.checkBoxesWrapper}>
          <FormGroup className={styles.formGroup}>
            <FormControlLabel
              className={styles.formControlLabel}
              control={
                <Checkbox
                  className={styles.checkbox}
                  defaultChecked
                  checked={checkedAdults}
                  onChange={() => {
                    setCheckedAdults(!checkedAdults);
                  }}
                />
              }
              label="I offer sessions for adults"
            />
            <FormControlLabel
              className={styles.formControlLabel}
              control={
                <Checkbox
                  className={styles.checkbox}
                  checked={checkedChildren}
                  onChange={() => {
                    setCheckedChildren(!checkedChildren);
                  }}
                />
              }
              label="I offer sessions for children"
            />
          </FormGroup>
        </Box>
      </Box>

      <Box className={styles.locationsSection}>
        <Box className={styles.locationsTitle}>
          <Typography variant="h4" className={styles.title}>
            Location
          </Typography>
          <Typography variant="subtitle1" className={styles.subtitle}>
            Choose one or two options.
          </Typography>
        </Box>
        <Box
          className={styles.locationInputsWrapper}
          sx={{ gap: matches600 ? 3 : 1.5 }}
        >
          {locationValuesInputs.map((value, index) => {
            return (
              <Box
                key={index}
                className={styles.inputsBox}
                sx={{ gap: 1.5, position: 'relative' }}
              >
                <Input
                  name={value.city}
                  label={'City'}
                  value={value.city}
                  sx={{}}
                  onChange={(e) =>
                    setLocationValuesInputs(
                      locationValuesInputs.map((value, ind) => {
                        if (index === ind) {
                          return {
                            ...value,
                            city: e.target.value,
                          };
                        }
                        return value;
                      })
                    )
                  }
                  type="text"
                />
                <Input
                  name={value.street}
                  label={'Street'}
                  value={value.street}
                  sx={{}}
                  onChange={(e) =>
                    setLocationValuesInputs(
                      locationValuesInputs.map((value, ind) => {
                        if (index === ind) {
                          return {
                            ...value,
                            street: e.target.value,
                          };
                        }
                        return value;
                      })
                    )
                  }
                  type="text"
                />
                <Input
                  name={value.postCode}
                  label={'Post code'}
                  value={value.postCode}
                  sx={{ maxWidth: matches600 ? '100%' : '189px' }}
                  onChange={(e) =>
                    setLocationValuesInputs(
                      locationValuesInputs.map((value, ind) => {
                        if (index === ind) {
                          return {
                            ...value,
                            postCode: e.target.value,
                          };
                        }
                        return value;
                      })
                    )
                  }
                  type="number"
                />
                {value.icon && (
                  <Box
                    sx={{
                      position: 'absolute',
                      cursor: 'pointer',
                      right: matches600 ? '-5px' : '-11.8px',
                      top: matches600 ? '-15px' : '-10px',
                      width: '15px',
                      height: '15px',
                    }}
                    onClick={() => deleteLocationInputs(index)}
                  >
                    {value.icon}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box className={styles.locationsSection}>
        <Typography
          className={styles.locationBtn}
          onClick={() => {
            setLocationValuesInputs((prev) => [
              ...prev,
              {
                city: '',
                street: '',
                postCode: '',
                icon: (
                  <Close
                    sx={{
                      width: '100%',
                      height: '100%',
                      color: '#CECECE',
                      '&:hover': {
                        color: '#000000',
                      },
                    }}
                  />
                ),
              },
            ]);
          }}
        >
          + Add more locations
        </Typography>
      </Box>
      <Box className={styles.btnSave} onClick={saveProfileInfo}>
        Save
      </Box>
      {isLoad && (
        <CustomModel isOpen={isLoad}>
          <Loader />
        </CustomModel>
      )}
      {error && !isSuccess && (
        <CustomModel
          isOpen={modalIsOpen}
          handleClick={() => setModalIsOpen(!modalIsOpen)}
        >
          <MessageBox
            message={error}
            handleClick={() => setModalIsOpen(!modalIsOpen)}
          />
        </CustomModel>
      )}
      {isSuccess && (
        <CustomModel isOpen={modalIsOpen} handleClick={closeSuccessMessage}>
          <MessageBox
            message={'Personal information saved successfully'}
            handleClick={closeSuccessMessage}
          />
        </CustomModel>
      )}
    </Box>
  );
};

export default YourProfile;
