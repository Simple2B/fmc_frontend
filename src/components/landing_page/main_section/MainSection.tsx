import { Box } from '@mui/material';
import TitleBox from '../title_box/TitleBox';
import Cards from './cards/Cards';
import styles from './MainSection.module.sass';

export interface IMainSection {}

const MainSection: React.FC<IMainSection> = () => {
  return (
    <Box className={styles.section}>
      <TitleBox
        color={'#000'}
        top={''}
        title={'Explore sport categories '}
        description={'Choose your coach based on your favorite sport'}
      />
      <Box className={styles.wrapperCardTypeSports}>
        <Cards />
      </Box>
    </Box>
  );
};

export default MainSection;
