/* eslint-disable no-unused-vars */
import Input from '@/common/input/Input';
import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import DragDropFiles from '@/common/upload_drag_and_drop_input/DragDropFiles';
import { coachProfileApi } from '@/fast_api_backend/api/usersInstance/coach/profileInstance';
import { getErrorMessage } from '@/helper/error_function';
import { RE_POST_CODE } from '@/store/constants';
import { TypeLocation } from '@/store/types/location/locationType';
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
const inputStyles = {
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
  city: {
    name: string;
    isError: boolean;
    messageError: string;
  };
  street: {
    name: string;
    isError: boolean;
    messageError: string;
  };
  postal_code: {
    name: string;
    isError: boolean;
    messageError: string;
  };
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
              ? response.locations.map((location) => ({
                  city: {
                    name: location.city,
                    isError: false,
                    messageError: '',
                  },
                  street: {
                    name: location.street,
                    isError: false,
                    messageError: '',
                  },
                  postal_code: {
                    name: location.postal_code,
                    isError: false,
                    messageError: '',
                  },
                }))
              : [
                  {
                    city: {
                      name: '',
                      isError: false,
                      messageError: '',
                    },
                    street: {
                      name: '',
                      isError: false,
                      messageError: '',
                    },
                    postal_code: {
                      name: '',
                      isError: false,
                      messageError: '',
                    },
                  },
                ]
          );
        }
      } catch (error: any) {
        console.log(`POST [your profile] error message: ${error.message}`);
      }
    };
    getData(userType);
  };
  const [sport, setSport] = useState<{ id: number; label: string }[]>([]);

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
    [
      {
        city: {
          name: '',
          isError: false,
          messageError: '',
        },
        street: {
          name: '',
          isError: false,
          messageError: '',
        },
        postal_code: {
          name: '',
          isError: false,
          messageError: '',
        },
      },
    ]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [files, setFiles] = useState<File[]>([]);
  // TODO: download link of certificate
  // {/* <Link to="/files/myfile.pdf" target="_blank" download>Download</Link> */}

  const deleteLocationInputs = (index: number) => {
    setLocationValuesInputs(
      locationValuesInputs.filter((item, ind) => ind !== index)
    );
  };

  const handleChangeLocation = (
    e: { target: { value: string } },
    setLocationValuesInputs: (arg0: any) => void,
    locationIndex: number,
    typeLocation: string
  ) => {
    setLocationValuesInputs(
      locationValuesInputs.map((item, index) => {
        if (index === locationIndex) {
          if (e.target.value !== '') {
            if (
              typeLocation === TypeLocation.postal_code &&
              !RE_POST_CODE.test(e.target.value.toLowerCase())
            ) {
              return item;
            }
            return {
              ...item,
              [typeLocation]: {
                name: e.target.value,
                isError: false,
                messageError: '',
              },
            };
          } else {
            return {
              ...item,
              [typeLocation]: {
                name: e.target.value,
                isError: true,
                messageError: 'Field is required',
              },
            };
          }
        }
        return item;
      })
    );
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
    const location = locationValuesInputs.map((item) => {
      if (item.city.name === '') {
        return {
          ...item,
          city: {
            ...item.city,
            isError: true,
            messageError: 'Field is required',
          },
        };
      }
      if (item.street.name === '') {
        return {
          ...item,
          street: {
            ...item.street,
            isError: true,
            messageError: 'Field is required',
          },
        };
      }
      if (item.postal_code.name === '') {
        return {
          ...item,
          postal_code: {
            ...item.postal_code,
            isError: true,
            messageError: 'Field is required',
          },
        };
      }
      return item;
    });
    setLocationValuesInputs(location);

    const isLocation = location.map((item) => {
      if (
        item.city.isError ||
        item.street.isError ||
        item.postal_code.isError
      ) {
        return false;
      }
      return true;
    });

    if (sport.length !== 0 && isLocation.every((v) => v === true)) {
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
              locations.map((location) => ({
                city: location.city.name,
                street: location.street.name,
                postal_code: location.postal_code.name,
              }))
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
          sx={{ gap: matches600 ? 3 : 2 }}
        >
          {locationValuesInputs.map((value, index) => {
            return (
              <Box
                key={index}
                className={styles.inputsBox}
                sx={{ gap: matches600 ? 2.5 : 1.5, position: 'relative' }}
              >
                <Input
                  helperText={value.city.messageError}
                  isError={value.city.isError}
                  name={value.city.name}
                  label={'City'}
                  value={value.city.name}
                  sx={inputStyles}
                  onChange={(e) =>
                    handleChangeLocation(
                      e,
                      setLocationValuesInputs,
                      index,
                      TypeLocation.city
                    )
                  }
                  type="text"
                />
                <Input
                  name={value.street.name}
                  label={'Street'}
                  helperText={value.street.messageError}
                  isError={value.street.isError}
                  value={value.street.name}
                  sx={inputStyles}
                  onChange={(e) =>
                    handleChangeLocation(
                      e,
                      setLocationValuesInputs,
                      index,
                      TypeLocation.street
                    )
                  }
                  type="text"
                />
                <Input
                  name={value.postal_code.name}
                  label={'Post code'}
                  helperText={value.postal_code.messageError}
                  isError={value.postal_code.isError}
                  value={value.postal_code.name}
                  sx={{
                    ...inputStyles,
                    maxWidth: matches600 ? '100%' : '189px',
                  }}
                  onChange={(e) =>
                    handleChangeLocation(
                      e,
                      setLocationValuesInputs,
                      index,
                      TypeLocation.postal_code
                    )
                  }
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
                city: {
                  name: '',
                  isError: false,
                  messageError: '',
                },
                street: {
                  name: '',
                  isError: false,
                  messageError: '',
                },
                postal_code: {
                  name: '',
                  isError: false,
                  messageError: '',
                },
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
