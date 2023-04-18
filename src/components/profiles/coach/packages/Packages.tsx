import Input from '@/common/input/Input';
import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { coachPackageApi } from '@/fast_api_backend/api/usersInstance/coach/package';
import { getErrorMessage } from '@/helper/error_function';
import { PackagesService } from '@/services/services/PackagesService';
import { RE_ONLY_NUMBER, RE_PRICE } from '@/store/constants';
import { ILocation } from '@/store/types/location/locationType';
import { ISport } from '@/store/types/users/coach/profileType';
import { Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styles from './Packages.module.sass';

const nameInputStyles = {
  // mt: matches600 ? 1.5 : 4,
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

// TODO: add to sessionsTypes 'Group Session' (need to be done in the next milestone)
const sessionsTypes = ['1 on 1 Session'];

export interface IPackages {}

const Packages: React.FC<IPackages> = () => {
  const router = useRouter();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState<string>('');

  const [aboutSession, setAboutSession] = useState<string>('');
  const [additionalInformationTitle, setAdditionalInformationTitle] =
    useState<string>('');
  const [
    additionalInformationDescription,
    setAdditionalInformationDescription,
  ] = useState<string>('');

  useQuery(['packagesQuery'], async () => {
    const result = await PackagesService.apiGetPackages();
    if (result.lessons.length > 0) {
      const lessonNumber = result.lessons.length - 1;
      setName(result.lessons[lessonNumber].title ?? '');
      setAboutSession(result.lessons[lessonNumber].about ?? '');
      setAdditionalInformationTitle(
        result.lessons[lessonNumber].additional_information_title ?? ''
      );
      setAdditionalInformationDescription(
        result.lessons[lessonNumber].additional_information_description ?? ''
      );
    }
    return result;
  });

  const [errorNameMessage, setErrorNameMessage] = useState<string>('');
  const [isErrorName, setIsErrorName] = useState<boolean>(false);

  // TODO: add change amount of student
  // eslint-disable-next-line no-unused-vars
  const [amount, setAmount] = useState<string>('1');

  // TODO: add change price
  // eslint-disable-next-line no-unused-vars
  const [price, setPrice] = useState<string>('65');
  const [errorPriceMessage, setErrorPriceMessage] = useState<string>('');
  const [isErrorPrice, setIsErrorPrice] = useState<boolean>(false);

  const [typeSession, setTypeSession] = useState<string | null>(
    sessionsTypes[0]
  );

  //coach locations
  const [locations, setLocations] = useState<
    {
      name: string;
      locationData: ILocation;
    }[]
  >([
    {
      name: '',
      locationData: {
        id: 0,
        uuid: '',
        name: '',
        city: '',
        street: '',
        postal_code: '',
      },
    },
  ]);

  const [location, setLocation] = useState<string | null>('');

  useQuery(['locationsTypesQuery'], async () => {
    const request = coachClientApi.coachGetLocations;
    const result = await request();
    console.log('[locationsTypesQuery] result => ', result);
    if (result.length > 0) {
      const locationResult = result.map((item) => ({
        name: item.city + ', ' + item.street + ', ' + item.postal_code,
        locationData: item,
      }));
      setLocations(locationResult);
      setLocation(locationResult[0].name);
    }
    return result;
  });
  //

  //coach sports
  const [sports, setSports] = useState<
    {
      name: string;
      sportData: ISport;
    }[]
  >([
    {
      name: '',
      sportData: {
        id: 0,
        uuid: '',
        name: '',
      },
    },
  ]);

  const [sport, setSport] = useState<string | null>(sports[0].name);

  useQuery(['sportsTypesQuery'], async () => {
    const request = coachClientApi.coachGetSports;
    const result = await request();
    console.log('[sessionsTypesQuery] result => ', result);
    if (result.length > 0) {
      const resultData = result.map((sport) => ({
        name: sport.name,
        sportData: sport,
      }));
      setSports(resultData);
      setSport(resultData[0].name);
    }
    return result;
  });

  const savePackage = () => {
    if (name === '') {
      setIsErrorName(true);
      setErrorNameMessage('Name cannot be empty');
    } else {
      setIsErrorName(false);
      setErrorNameMessage('');
    }
    if (price === '') {
      setIsErrorPrice(true);
      setErrorPriceMessage('Price cannot be empty');
    } else {
      setIsErrorPrice(false);
      setErrorPriceMessage('');
    }

    const locData = locations.filter((loc) => loc.name === location);
    const sportData = sports.filter((s) => s.name === sport);

    const dataPackage = {
      title: name,
      location: locData[0].locationData,
      sport: sportData[0].sportData,
      price: Number(price) * 100,
      max_people: Number(amount),
      about: aboutSession,
      additional_information_title: additionalInformationTitle,
      additional_information_description: additionalInformationDescription,
    };

    if (name !== '' && price !== '') {
      const createPackage = async () => {
        try {
          setIsLoad(true);
          const response = await coachPackageApi.createPackage(dataPackage);
          console.log('POST [/personal_info] coach successfully', response);
          setIsLoad(false);
          setSuccess(true);
          router.push('/profiles/coach?my_appointments');
        } catch (error: any) {
          setIsLoad(false);

          console.log(
            `POST create package coach error message: ${error.message}`
          );
          setSuccess(false);
          getErrorMessage(error.message, setError);
        }
      };
      createPackage();
      setName('');
      setAboutSession('');
      // setClothes('');
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setModalIsOpen(true);
        setError(null);
        setIsLoad(false);
      }, 1000);
    }
  }, [modalIsOpen, error]);

  const closeSuccessMessage = () => {
    setModalIsOpen(!modalIsOpen);
    setSuccess(false);
  };

  return (
    <Box className={styles.wrapper} flex={1} p={2}>
      <Box
        sx={{
          mb: '48px',
          fontFamily: 'Inter, sens-serif',
          fontWeight: 500,
          fontSize: '24px',
        }}
      >
        Packages you offer
      </Box>
      {locations[0].locationData.id !== 0 ? (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              mb: '45px',
            }}
          >
            <Box sx={{ width: 424, mr: '12px' }}>
              <Input
                helperText={errorNameMessage}
                isError={isErrorName}
                name={'name'}
                label={'Name of Session'}
                value={name}
                sx={{ ...nameInputStyles, width: '100%' }}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </Box>
            <Box sx={{ width: 206 }}>
              <Input
                // helperText={errorNameMessage}
                // isError={isErrorName}
                name={'amount'}
                label={'Amount of students'}
                value={amount}
                sx={{ ...nameInputStyles, maxWidth: '100%' }}
                onChange={(e) => {
                  if (!RE_ONLY_NUMBER.test(e.target.value.toLowerCase())) {
                    return;
                  }
                  // TODO: add change amount of students for lesson
                  // setAmount(e.target.value);
                }}
                type="text"
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              mb: '45px',
            }}
          >
            <Box sx={{ width: 424, mr: '12px' }}>
              <Autocomplete
                value={typeSession}
                onChange={(event: any, newValue: string | null) => {
                  setTypeSession(newValue);
                }}
                id="controllable-states-demo"
                options={sessionsTypes}
                sx={{ ...nameInputStyles, width: '100%' }}
                renderInput={(params: any) => (
                  <TextField {...params} label="Type of Session" />
                )}
              />
            </Box>
            <Box
              sx={{
                width: 206,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px',
                  fontWeight: 500,
                  color: 'rgba(0, 0, 0, 0.87)',
                  mr: '5px',
                }}
              >
                £
              </Box>
              <Input
                helperText={errorPriceMessage}
                isError={isErrorPrice}
                name={'price'}
                label={'Price'}
                value={price}
                sx={{ ...nameInputStyles, maxWidth: '100%' }}
                onChange={(e) => {
                  if (!RE_PRICE.test(e.target.value.toLowerCase())) {
                    return;
                  }
                  // TODO: add change price
                  setPrice(e.target.value);
                }}
                type="text"
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: 642,
              mb: '45px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Autocomplete
              value={location}
              onChange={(event: any, newValue: string | null) => {
                setLocation(newValue);
              }}
              id="controllable-states-demo"
              options={locations.map((loc) => loc.name)}
              sx={{ ...nameInputStyles, width: '49%' }}
              renderInput={(params: any) => (
                <TextField {...params} label="Location" />
              )}
            />
            <Autocomplete
              value={sport}
              onChange={(event: any, newValue: string | null) => {
                setSport(newValue);
              }}
              id="controllable-states-demo"
              options={sports.map((sport) => sport.name)}
              sx={{ ...nameInputStyles, width: '49%' }}
              renderInput={(params: any) => (
                <TextField {...params} label="Sport" />
              )}
            />
          </Box>
          <Box sx={{ width: 642, mb: '45px' }}>
            <TextField
              sx={{ width: '100%' }}
              id="outlined-multiline-static"
              label="About session"
              multiline
              rows={4}
              value={aboutSession}
              onChange={(e) => setAboutSession(e.target.value)}
            />
          </Box>
          <Box sx={{ width: 642, mb: '45px' }}>
            <Box
              sx={{
                fontFamily: 'Inter, sens-serif',
                fontWeight: '400',
                fontSize: '14px',
                color: '#222222',
                p: '10px 15px',
              }}
            >
              Additional information
            </Box>
            <Box sx={{ width: 642, mb: '7px' }}>
              <TextField
                sx={{ width: '100%' }}
                id="outlined-multiline-static"
                label="title"
                multiline
                rows={1}
                value={additionalInformationTitle}
                onChange={(e) => setAdditionalInformationTitle(e.target.value)}
              />
            </Box>
            <Box sx={{ width: 642 }}>
              <TextField
                sx={{ width: '100%' }}
                id="outlined-multiline-static"
                label="description"
                multiline
                rows={1.5}
                value={additionalInformationDescription}
                onChange={(e) =>
                  setAdditionalInformationDescription(e.target.value)
                }
              />
            </Box>
          </Box>

          {/* <Box sx={{ width: 642, mb: '45px' }}>
            <Input
              name={'clothes'}
              label={'What to bring?'}
              value={clothes}
              sx={{ ...nameInputStyles, width: '100%' }}
              onChange={(e) => setClothes(e.target.value)}
              type="text"
            />
          </Box> */}
          <Box
            sx={{
              width: 642,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              pt: '16px',
              pb: '16px',
              backgroundColor: '#1876D1',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#FFFFFF',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'all .3s ease-in-out',
              '&:hover': {
                backgroundColor: '#222CDF',
                transition: 'all .3s ease-in-out',
              },
            }}
            onClick={savePackage}
          >
            Save
          </Box>
        </>
      ) : (
        <Box
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '18px',
            fontWeight: 500,
          }}
        >
          To create a package, you need to fill information in the
          <Box
            component={'span'}
            onClick={() => router.push('/profiles/coach?settings')}
            sx={{
              ml: '5px',
              mr: '5px',

              color: '#1876D1',
              borderBottom: '1px solid #1876D1',
              cursor: 'pointer',
              transition: 'all .3s ease-in-out',
              '&:hover': {
                color: '#222CDF',
                borderBottom: '1px solid #222CDF',
                transition: 'all .3s ease-in-out',
              },
            }}
          >
            settings
          </Box>{' '}
          about the sport and the training location
        </Box>
      )}

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
            message={'Package created successfully'}
            handleClick={closeSuccessMessage}
          />
        </CustomModel>
      )}
    </Box>
  );
};

export default Packages;
