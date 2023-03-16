import Box from '@mui/material/Box';
import * as React from 'react';
import styles from './FavoriteCoaches.module.sass';

export interface IFavoriteCoaches {}

const FavoriteCoaches: React.FC<IFavoriteCoaches> = () => {
  // const router = useRouter();

  return <Box className={styles.wrapper}>Favorite Coaches</Box>;
};

export default FavoriteCoaches;
