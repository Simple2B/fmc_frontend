import * as React from 'react';
import style from './Loader.module.sass';

export interface ILoader {}

// eslint-disable-next-line no-empty-pattern
const Loader: React.FC<ILoader> = () => {
  return (
    <div className={style.ldsEllipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
