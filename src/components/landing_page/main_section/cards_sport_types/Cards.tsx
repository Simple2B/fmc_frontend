import { Box } from '@mui/material';
import Image from 'next/image';
import cricket from '../../../../../public/icons/cricket.png';
import fitness from '../../../../../public/icons/fitness.png';
import football from '../../../../../public/icons/football.png';
import golf from '../../../../../public/icons/golf.png';
import rugby from '../../../../../public/icons/rugby.png';
import swimming from '../../../../../public/icons/swimming.png';
import tennis from '../../../../../public/icons/tennis.png';
import more from '../../../../../public/icons/yoga.png';
import styles from './Cards.module.sass';

export interface ICards {}

const typeSports = [
  {
    icon: football,
    title: 'Football',
    description: '102 coaches ',
  },
  { icon: cricket, title: 'Cricket', description: '87 coaches ' },
  {
    icon: tennis,
    title: 'Tennis',
    description: '43 coaches ',
  },
  {
    icon: swimming,
    title: 'Swimming',
    description: '52 coaches ',
  },
  { icon: rugby, title: 'Rugby', description: '56 coaches ' },
  { icon: fitness, title: 'Fitness', description: '65 coaches ' },
  {
    icon: golf,
    title: 'Golf',
    description: '32 coaches ',
  },
  { icon: more, title: 'More', description: '24 coaches ' },
];

const Cards: React.FC<ICards> = () => {
  return (
    <Box className={styles.cards}>
      {typeSports.map((item, index) => {
        return (
          <Box key={index} className={styles.card}>
            <Box className={styles.icon}>
              <Image
                src={item.icon}
                alt={item.title}
                width={30}
                height={31.5}
              />
            </Box>
            <Box className={styles.title}>{item.title}</Box>
            <Box className={styles.description}>{item.description}</Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Cards;
