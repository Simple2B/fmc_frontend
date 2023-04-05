import Input from '@/common/input/Input';
import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import { RE_ONLY_NUMBER, RE_PRICE } from '@/store/constants';
import { Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useEffect, useState } from 'react';
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

const sessionsTypes = ['1 on 1 Session', 'Group Session'];

export interface IPackages {}

const Packages: React.FC<IPackages> = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState<string>('');
  const [errorNameMessage, setErrorNameMessage] = useState<string>('');
  const [isErrorName, setIsErrorName] = useState<boolean>(false);

  const [amount, setAmount] = useState<string>('');
  // const [errorAmountMessage, setErrorAmountMessage] = useState<string>('');
  // const [isErrorAmount, setIsErrorAmount] = useState<boolean>(false);

  const [price, setPrice] = useState<string>('');
  const [errorPriceMessage, setErrorPriceMessage] = useState<string>('');
  const [isErrorPrice, setIsErrorPrice] = useState<boolean>(false);

  const [typeSession, setTypeSession] = useState<string | null>(
    sessionsTypes[0]
  );

  const [aboutSession, setAboutSession] = useState<string>('');

  const [clothes, setClothes] = useState<string>('');

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

    const dataPackage = {
      name: name,
      amount: amount,
      typeSession: typeSession,
      price: price,
      aboutSession: aboutSession,
      clothes: clothes,
    };

    console.log('[Packages] dataPackage => ', dataPackage);

    // if (name !== '' && price !== '') {
    // }
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
              setAmount(e.target.value);
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
        <Box sx={{ width: 206 }}>
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
              setPrice(e.target.value);
            }}
            type="text"
          />
        </Box>
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
      <Box sx={{ width: 642, mb: '30px' }}>
        <Input
          name={'clothes'}
          label={'What to bring?'}
          value={clothes}
          sx={{ ...nameInputStyles, width: '100%' }}
          onChange={(e) => setClothes(e.target.value)}
          type="text"
        />
      </Box>
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
