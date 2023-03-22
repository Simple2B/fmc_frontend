/* eslint-disable no-undef */
import { NewsLetter } from '@/components/forms/news_letter/NewsLetter';
import MainSection from '@/components/landing_page/main_section/MainSection';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import LandingPage from '../components/landing_page/LandingPage';
import styles from '../styles/Home.module.sass';

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean | null>(false);
  // const [user, setUser] = useState('')
  // const user = localStorage.getItem('userType');
  // const isClose = localStorage.getItem('isClose');

  // const localDate = new Date();
  // const localTime = localDate.getTime();
  // const localTimePlus20 = localTime + 5;

  // useEffect(() => {
  //   const time = new Date();
  //   const timeDate = time.getTime();
  //   localStorage.setItem('time', timeDate.toString());
  //   localStorage.setItem('isClose', 'true');
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     localStorage.removeItem('time');
  //     localStorage.removeItem('isClose');
  //   } else {
  //     console.log('====================================');
  //     console.log(
  //       " localTimePlus20.toString() === localStorage.getItem('time') ",
  //       localTimePlus20.toString() === localStorage.getItem('time')
  //     );
  //     console.log('====================================');
  //     if (localTimePlus20.toString() === localStorage.getItem('time')) {
  //       localStorage.setItem('isClose', 'false');
  //     }
  //   }
  // }, [localDate, localTimePlus20, user]);

  useEffect(() => {
    setIsOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {isOpen && <NewsLetter setIsOpen={setIsOpen} />}
      </main>
    </>
  );
}
