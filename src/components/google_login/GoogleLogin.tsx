import React from 'react';
// import { GoogleLogin } from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';

export interface IGoogleLoginBtn {
  // clientId: string;
  buttonText: string;
  // eslint-disable-next-line no-unused-vars
  onSuccess: (res: any) => void;
  // eslint-disable-next-line no-unused-vars
  onError: (res?: any) => void;
}

// eslint-disable-next-line no-empty-pattern
const GoogleLoginBtn: React.FC<IGoogleLoginBtn> = ({
  // clientId,
  onSuccess,
  onError,
}) => {
  return (
    <GoogleLogin
      // render={(renderProps: {
      //   onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
      //   disabled: boolean | undefined;
      // }) => (
      //   <button
      //     type="button"
      //     className=""
      //     onClick={renderProps.onClick}
      //     disabled={renderProps.disabled}
      //   >
      //     Sign in with google
      //   </button>
      // )}
      // buttonText={buttonText}
      onSuccess={onSuccess}
      onError={onError}
      // cookiePolicy={'single_host_origin'}
      // isSignedIn={true}
    />
  );
};

export default GoogleLoginBtn;
