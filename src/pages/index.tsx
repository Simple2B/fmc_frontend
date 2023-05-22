/* eslint-disable no-undef */
import { NewsLetter } from '@/components/forms/news_letter/NewsLetter';
import MainSection from '@/components/landing_page/main_section/MainSection';
import { INTERVAL_NEWS_LETTER_POP_UP } from '@/store/constants';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import LandingPage from '../components/landing_page/LandingPage';
import styles from '../styles/Home.module.sass';

export default function Home() {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [isSubscribe, setIsSubscribe] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('userType');
    setUser(user);
    const subscribe = localStorage.getItem('subscribe');
    setIsSubscribe(subscribe);
  }, []);

  useEffect(() => {
    if (!user) {
      if (isSubscribe) {
        return;
      }
      const timeId = setTimeout(() => {
        setShow(true);
      }, INTERVAL_NEWS_LETTER_POP_UP);

      return () => {
        clearTimeout(timeId);
      };
    }
  }, [isSubscribe, user]);

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
        <script type="text/javascript">
        window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
        heap.load("1803201951");
        </script>
      </Head>
      <main className={styles.main}>
        <LandingPage wrapperClassName={styles.wrapper} />
        <MainSection />
        <NewsLetter closeModalNewsletter={closeModalNewsletter} show={show} />
      </main>
        <script type="text/javascript">
        window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
        heap.load("1803201951");
        </script>
    </>
  );
}
