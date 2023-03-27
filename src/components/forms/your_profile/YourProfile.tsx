/* eslint-disable no-unused-vars */
import Input from '@/common/input/Input';
import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import DragDropFiles from '@/common/upload_drag_and_drop_input/DragDropFiles';
import { coachProfileApi } from '@/fast_api_backend/api/usersInstance/coach/profileInstance';
import { getErrorMessage } from '@/helper/error_function';
import { RE_POST_CODE } from '@/store/constants';
import { ISport } from '@/store/types/sport/sportType';
import { UserType } from '@/store/types/user';
import { Close } from '@mui/icons-material';
import Textarea from '@mui/joy/Textarea';
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useEffect, useState } from 'react';
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
  postal_code: string;
  icon?: any;
}

export interface IYourProfileCoach {
  userType: string;
}

const YourProfile: React.FC<IYourProfileCoach> = ({ userType }) => {
  const matches600 = useMediaQuery('(max-width:600px)');

  const [options, setOptions] = useState<
    { id: number; label: string; is_deleted: boolean }[]
  >([]);

  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getYourProfileInfo = () => {
    const getData = async (userType: string) => {
      try {
        if (userType === UserType.coach) {
          const response = await coachProfileApi.getInfoProfile();
          setSport(
            response.sports.map((s, i) => ({
              id: i,
              label: s.name,
            }))
          );
          setFilesNames(
            response.certificates
              .filter((certificate) => !certificate.is_deleted)
              .map(
                (certificate) =>
                  certificate.certificate_url.split('/')[
                    certificate.certificate_url.split('/').length - 1
                  ]
              )
          );
          setFilesUrls(
            response.certificates
              .filter((certificate) => !certificate.is_deleted)
              .map((certificate) => certificate.certificate_url)
          );
          setCheckedAdults(response.is_for_adults);
          setCheckedChildren(response.is_for_children);
          setAbout(response.about);
          setLocationValuesInputs(
            response.locations.length > 0
              ? response.locations
              : [{ city: '', street: '', postal_code: '' }]
          );
        }
      } catch (error: any) {
        console.log(`POST [your profile] error message: ${error.message}`);
      }
    };
    getData(userType);
  };

  const [sport, setSport] = useState<{ id: number; label: string }[]>([]);
  console.log('=== [YourProfile] sport ===> ', sport);

  const [errorSportMessage, setErrorSportMessage] = useState<string>('');
  const [isErrorSport, setIsErrorSport] = useState<boolean>(false);

  const [skills, setSkills] = useState<string>('');

  const [filesNames, setFilesNames] = useState<string[] | null>(null);
  const [filesUrls, setFilesUrls] = useState<string[]>([]);
  const [deletedFilesUrls, setDeletedFilesUrls] = useState<string[] | null>(
    null
  );

  const [checkedAdults, setCheckedAdults] = useState<boolean>(true);
  const [checkedChildren, setCheckedChildren] = useState<boolean>(false);

  const [aboutCoach, setAbout] = useState<string>('');

  // Location
  const [locationValuesInputs, setLocationValuesInputs] = useState<ILocation[]>(
    []
  );

  useEffect(() => {
    const getSports = async () => {
      try {
        const res = await coachProfileApi.getTypeSports();
        setOptions(
          res.map((item: ISport, index) => ({
            label: item.name,
            id: index,
            is_deleted: false,
          }))
        );
      } catch (error) {
        console.log(`POST [your profile] error message: ${error}`);
        setOptions([]);
      }
    };
    getSports();
  }, []);

  useEffect(() => {
    getYourProfileInfo();
  }, []);

  const [files, setFiles] = useState<File[]>([]);
  // TODO: download link of certificate
  // {/* <Link to="/files/myfile.pdf" target="_blank" download>Download</Link> */}

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
  };

  const saveYourProfileInfo = () => {
    if (sport.length === 0) {
      setIsErrorSport(true);
      setErrorSportMessage('Sport cannot be empty');
    } else {
      setIsErrorSport(false);
      setErrorSportMessage('');
    }
    if (sport.length !== 0) {
      const saveData = async (userType: string) => {
        const locations = locationValuesInputs.map((location) => ({
          city: location.city,
          street: location.street,
          postal_code: location.postal_code,
        }));
        try {
          if (userType === UserType.coach) {
            setIsLoad(true);
            const responseProfile = await coachProfileApi.updateProfileCoach(
              sport.length > 0 ? sport.map((s) => s.label) : [],
              deletedFilesUrls ? deletedFilesUrls : [],
              aboutCoach,
              files,
              String(checkedAdults),
              String(checkedChildren),
              locations
            );
            getYourProfileInfo();
            setIsLoad(false);
            setSuccess(true);
          }
        } catch (error: any) {
          setIsLoad(false);
          console.log(`POST [your profile] error message: ${error.message}`);
          setSuccess(false);
          getErrorMessage(error.message, setError);
        }
      };
      saveData(userType);
    }
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
          <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => `${option.label}`}
            value={sport}
            isOptionEqualToValue={(o, v) => o.label === v.label}
            renderOption={(props, options) => (
              <Box component={'li'} {...props} key={options.id}>
                {options.label}
              </Box>
            )}
            onChange={(event, newValue) => {
              if (newValue) {
                setSport(newValue);
                setIsErrorSport(false);
                setErrorSportMessage('');
              } else {
                setIsErrorSport(true);
                setErrorSportMessage('Sport cannot be empty');
              }
            }}
            sx={nameInputStyles}
            renderInput={(params) => (
              <TextField
                {...params}
                label={'Sport'}
                helperText={errorSportMessage}
                sx={{
                  '& .MuiFormHelperText-root': {
                    color: 'red',
                  },
                }}
                error={isErrorSport}
              />
            )}
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
            // TODO: logic for this input must be add (now it is disabled)
            disabled={true}
          />
        </Box>
      </Box>
      <Box className={styles.aboutSection}>
        <Textarea
          placeholder="About"
          minRows={6}
          sx={{ width: '100%' }}
          value={aboutCoach}
          onChange={(e) => setAbout(e.target.value)}
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
            certificateUrl={filesUrls}
            setDeletedFilesNames={setDeletedFilesUrls}
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
                  name={value.postal_code}
                  label={'Post code'}
                  value={value.postal_code}
                  sx={{ maxWidth: matches600 ? '100%' : '189px' }}
                  onChange={(e) => {
                    setLocationValuesInputs(
                      locationValuesInputs.map((value, ind) => {
                        if (
                          index === ind &&
                          RE_POST_CODE.test(e.target.value)
                        ) {
                          return {
                            ...value,
                            postCode: e.target.value,
                          };
                        }
                        return value;
                      })
                    );
                  }}
                  type="string"
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
                postal_code: '',
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
      <Box className={styles.btnSave} onClick={saveYourProfileInfo}>
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
