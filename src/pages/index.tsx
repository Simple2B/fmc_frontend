import MainSection from '@/components/landing_page/main_section/MainSection';
import Head from 'next/head';
import LandingPage from '../components/landing_page/LandingPage';
import styles from '../styles/Home.module.sass';

export default function Home() {
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
      </main>
    </>
  );
}
