import { TypeSign, UserType } from '@/store/types/user';
import Head from 'next/head';
import linkLogo from '../../../public/LOGO(WHITE).svg';
import SignUpStartPage from '../../components/forms/sign_up_start_page/SignUpStartPage';
import SignUpSPLayout from '../../components/layouts/sign_up_sp/SignUpSPLayout';

export default function SignUpCoachStudent() {
  return (
    <>
      <Head>
        <title>Sign Up Coach Athlete</title>
        <meta name="description" content="Sign Up Coach Athlete" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script type="text/javascript">
        window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
        heap.load("1803201951");
        </script>
      </Head>
      <SignUpSPLayout
        linkBackgroundImg={'../../../img/young-basketball-bg.png'}
        wrapperClassName={'boxWithBackgroundStartPage'}
        linkLogo={linkLogo}
        color={'#fff'}
        description={'Already have an account? Log in like a'}
        userType={UserType.student}
        typeSign={TypeSign.up}
      >
        <SignUpStartPage />
      </SignUpSPLayout>
    </>
  );
}
