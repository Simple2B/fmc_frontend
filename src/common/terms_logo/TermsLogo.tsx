import Image from 'next/image';
import Link from 'next/link';
import linkLogo from '../../../public/LOGO.svg';
import style from './TermLogo.module.sass';

export const TermsLogo = () => {
  return (
    <div className={style.logo}>
      <Link href="/">
        <Image src={linkLogo} alt="LOGO" width={120} height={103} />
      </Link>
    </div>
  );
};
