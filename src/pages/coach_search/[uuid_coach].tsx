/* eslint-disable no-undef */
import CardCoachProfile from '@/components/coach_profile/CardCoachProfile';
import AboutCoachProfile from '@/components/coach_profile/about_coach_profile/AboutCoachProfile';
import LessonsOffered from '@/components/coach_profile/lessons_offered/LessonsOffered';
import CoachSearchNavbar from '@/components/coach_search/CoachSearchNavbar';
import Reviews from '@/components/profiles/coach/reviews/Reviews';
import { instance } from '@/fast_api_backend/api/_axiosInstance';
import { PaymentCheckState } from '@/store/types/users/coach/profileType';
import { Box } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.sass';

export default function CoachProfilePage() {
  const router = useRouter();
  const [isLogIn, setIsLogIn] = useState<boolean | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  const [isPaymentCheck, setIsPaymentCheck] = useState<PaymentCheckState>(
    PaymentCheckState.PENDING
  );

  useEffect(() => {
    const whoAmI = async () => {
      try {
        const response = await instance().get('/whoami/student');
        // const response = await WhoamiService.apiWhoamiStudent();
        const res = response.data;
        console.log(`[GET] check student -> res data  ${res}`);
        setIsLogIn(true);
        setUserType(localStorage.getItem('userType') ?? '');
      } catch (error: any) {
        setIsLogIn(false);
      }
    };
    whoAmI();
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>Coach Profile Page</title>
        <meta name="description" content="Coach Profile Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainCoachSearch}>
        <CoachSearchNavbar wrapperClassName={styles.boxCoachSearch} />
        <div className={styles.boxCoachSearchContent}>
          <CardCoachProfile />
          <AboutCoachProfile
            isLogIn={isLogIn}
            userType={userType}
            isPaymentCheck={isPaymentCheck}
            setIsPaymentCheck={setIsPaymentCheck}
          />
          <LessonsOffered
            isLogIn={isLogIn}
            userType={userType}
            isPaymentCheck={isPaymentCheck}
            setIsPaymentCheck={setIsPaymentCheck}
          />
          <Box
            sx={{
              width: '96%',
              borderBottom: '1px solid #EBF6FF',
            }}
          />
          <Reviews />
        </div>
      </main>
    </>
  );
}
