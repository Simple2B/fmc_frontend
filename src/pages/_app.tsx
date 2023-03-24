import { AuthProvider } from '@/context/authContext';
import { config as conf } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Loader from '../common/loader/Loader';
import CustomModel from '../common/modal/Modal';
import '../styles/main.sass';
conf.autoAddCss = false;

const Loading = () => {
  const router = useRouter();
  const [isLoad, setIsLoad] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setIsLoad(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setTimeout(() => setIsLoad(false), 500);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // return () => {
    //   router.events.off('routeChangeStart', handleStart);
    //   router.events.off('routeChangeComplete', handleComplete);
    //   router.events.off('routeChangeError', handleComplete);
    // };
    setTimeout(() => {
      setIsLoad(false);
    }, 500);
  }, [router.asPath, router.events]);

  return (
    <>
      {isLoad && (
        <CustomModel isOpen={isLoad}>
          <Loader />
        </CustomModel>
      )}
    </>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Loading />
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
