import React, { PropsWithChildren } from 'react';
import style from './TermsWrapper.module.sass';

export const TermsLi: React.FC<PropsWithChildren> = ({ children }) => {
  return <li className={style.li}>{children}</li>;
};
