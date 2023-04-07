import React, { PropsWithChildren } from 'react';
import style from './TermsWrapper.module.sass';

export const TermsSubTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return <h3 className={style.subTitle}>{children}</h3>;
};
