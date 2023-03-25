import { AuthContext } from '@/context/authContext';
import { TypeSign } from '@/store/types/user';
import { Button, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import googleIcon from '../../../public/logo_google.png';

export interface IGoogleLoginBtn {
  // eslint-disable-next-line no-unused-vars
  onSuccess: any;
  // eslint-disable-next-line no-unused-vars
  onError?: any;
  typeSign: string;
}

// eslint-disable-next-line no-empty-pattern
const GoogleLoginBtn: React.FC<IGoogleLoginBtn> = ({
  onSuccess,
  onError,
  typeSign,
}) => {
  const keys = useContext(AuthContext);
  const matches320 = useMediaQuery('(min-width:320px)');
  return (
    <GoogleLogin
      clientId={keys.googleClientId}
      render={(renderProps) => {
        return (
          <Button
            fullWidth
            variant="contained"
            onClick={renderProps.onClick}
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: '8px',
              width: '100%',
              height: '56px',
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#1876D1',
              fontWeight: 500,
              fontSize: matches320 ? '13px' : '14px',
              '&:hover': {
                color: '#fff',
              },
            }}
          >
            <Image
              src={googleIcon}
              alt={'google'}
              width={40}
              height={40}
              style={{ marginRight: '13px' }}
            />
            {typeSign === TypeSign.up
              ? 'Sign up with Google'
              : '`Sign in with Google`'}
          </Button>
        );
      }}
      onSuccess={onSuccess}
      onFailure={onError}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginBtn;
