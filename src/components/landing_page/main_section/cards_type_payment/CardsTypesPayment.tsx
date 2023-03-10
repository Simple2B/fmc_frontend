import { Box } from '@mui/material';

import Image from 'next/image';
import one from '../../../../../public/icons_number/1.png';
import two from '../../../../../public/icons_number/2.png';
import three from '../../../../../public/icons_number/3.png';
import styles from './CardsTypesPayment.module.sass';

export interface ICardsTypesPayment {}

const typePayment = [
  {
    icon: one,
    title: 'Explore our coaches',
    description:
      'Search for coaches in the marketplace and find the right coach based on your sport, location or price.',
    width: 31,
    height: 72,
  },

  {
    icon: two,
    title: 'Purchase  packages',
    description:
      'We have made booking fast, secure and easy for you. Book your coach and get ready for your first session.',
    width: 40,
    height: 72,
  },

  {
    icon: three,
    title: 'Get to work!',
    description:
      'Meet up at an arranged time and place with your coach and take the next step towards getting better.',
    width: 42,
    height: 72,
  },
];

const CardsTypesPayment: React.FC<ICardsTypesPayment> = () => {
  return (
    <Box className={styles.cards}>
      {typePayment.map((item, index) => {
        return (
          <Box key={index} className={styles.card}>
            <Box className={styles.icon}>
              <Image
                src={item.icon}
                alt={styles.title}
                width={item.width}
                height={item.height}
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

export default CardsTypesPayment;
