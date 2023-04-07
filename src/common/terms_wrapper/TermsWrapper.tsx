import { PropsWithChildren } from 'react';
import style from './TermsWrapper.module.sass';

export const TermsWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.wrapper}>{children}</div>;
};
