import React, { PropsWithChildren } from 'react';
import style from './TermsWrapper.module.sass';

export const TermsText: React.FC<PropsWithChildren> = ({ children }) => {
  return <p className={style.text}>{children}</p>;
};
