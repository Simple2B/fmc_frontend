import Box from '@mui/material/Box';
import * as React from 'react';
import styles from './Messages.module.sass';

export interface IPackages {}

const Packages: React.FC<IPackages> = () => {
  // const router = useRouter();

  return <Box className={styles.wrapper}>Packages</Box>;
};

export default Packages;
