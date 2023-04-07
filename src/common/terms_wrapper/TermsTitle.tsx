import React, { PropsWithChildren } from 'react';
import style from './TermsWrapper.module.sass';

export const TermsTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return <h2 className={style.title}>{children}</h2>;
};
