/* eslint-disable no-undef */
import Btns from '@/components/coach_search/Btns';
import CoachCards from '@/components/coach_search/CoachCards';
import CoachSearchInput from '@/components/coach_search/CoachSearchInput';
import CoachSearchNavbar from '@/components/coach_search/CoachSearchNavbar';
import FilterBtn from '@/components/coach_search/FilterBtn';
import { instance } from '@/fast_api_backend/api/_axiosInstance';
import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.sass';

export default function CoachSearchPage() {
  const router = useRouter();
  const [isLogIn, setIsLogIn] = useState<boolean | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const whoAmI = async () => {
      try {
        const response = await instance().get('/whoami/student');
        const res = response.data;
        console.log(`[GET] check student -> res data  ${res}`);
        setIsLogIn(true);
        setUserType(localStorage.getItem('userType') ?? '');
        // const studentProfile = await studentClientApi.studentGetProfile();
        // setProfile(studentProfile);
      } catch (error: any) {
        console.log(
          `[GET] check student -> error message => ${error.response.status}`
        );
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        setIsLogIn(false);
        // router.push('/sign_in/student');
      }
    };
    whoAmI();
  }, [router, router.asPath]);
  return (
    <>
      <Head>
        <title>Coach search</title>
        <meta name="description" content="Coach search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainCoachSearch}>
        <CoachSearchNavbar wrapperClassName={styles.boxCoachSearch} />
        <div className={styles.boxCoachSearchContent}>
          <Box
            sx={{
              maxWidth: '1140px',
              width: '100%',
              p: '0 24px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            gap={1}
          >
            <FilterBtn />
            <CoachSearchInput />
            <Btns />
          </Box>
          <CoachCards isLogIn={isLogIn} userType={userType} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              pt: '75px',
              pb: '88px',
            }}
          >
            <Box
              sx={{
                width: '320px',
                maxWidth: '98%',
                backgroundColor: '#1664C0',
                height: '65px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                transition: '.3s ease all',
                borderRadius: '15px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#222CDF',
                  transition: '.3s ease all',
                },
              }}
            >
              <Typography
                sx={{
                  color: '#FFFFFF',

                  fontFamily: 'Inter',
                  fontSize: '24px',
                  fontWeight: '400',
                }}
              >
                Load more coaches
              </Typography>
            </Box>
          </Box>
        </div>
        {/* {isLoad && (
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
        )} */}
      </main>
    </>
  );
}
