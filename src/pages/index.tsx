/* eslint-disable no-undef */
import { NewsLetter } from '@/components/forms/news_letter/NewsLetter';
import MainSection from '@/components/landing_page/main_section/MainSection';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import LandingPage from '../components/landing_page/LandingPage';
import styles from '../styles/Home.module.sass';

export default function Home() {
  const [show, setShow] = useState(false);
  const user = localStorage.getItem('userType');
  console.log('====================================');
  console.log(' user ', user);
  console.log('====================================');

  useEffect(() => {
    if (!user) {
      const timeId = setTimeout(() => {
        setShow(true);
      }, 5000);

      return () => {
        clearTimeout(timeId);
      };
    }
  }, [user]);

  const closeModalNewsletter = () => {
    setShow(false);
  };

  return (
    <>
      <Head>
        <title>Find My Coach</title>
        <meta name="description" content="Find My Coach" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <LandingPage wrapperClassName={styles.wrapper} />
        <MainSection />
        {show && <NewsLetter closeModalNewsletter={closeModalNewsletter} />}
      </main>
    </>
  );
}
