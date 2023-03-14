import { authApi } from '@/fast_api_backend/api/authApi/auth';
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

export const AuthContext = createContext<{
  googleClientId: string;
  googleApiKey: string;
}>({
  googleClientId: '',
  googleApiKey: '',
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [keys, setKeys] = useState<{
    googleClientId: string;
    googleApiKey: string;
  }>({
    googleClientId: '',
    googleApiKey: '',
  });
  useEffect(() => {
    const getGKeys = async () => {
      const gapiConnect = await import('gapi-script').then((pack) => pack.gapi);
      const gKeys = await authApi.getGoogleKey();
      function start() {
        gapiConnect.client.init({
          clientId: gKeys.GOOGLE_CLIENT_ID,
          apiKey: gKeys.GOOGLE_CLIENT_SECRET,
        });
      }
      await gapiConnect.load('client:auth2', start);
      setKeys({
        googleClientId: gKeys.GOOGLE_CLIENT_ID,
        googleApiKey: gKeys.GOOGLE_CLIENT_SECRET,
      });
    };
    getGKeys();
  }, []);

  return <AuthContext.Provider value={keys}>{children}</AuthContext.Provider>;
};
