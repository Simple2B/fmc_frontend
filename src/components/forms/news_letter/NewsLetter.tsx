import CustomModel from '@/common/modal/Modal';
import { Close } from '@mui/icons-material';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import picture from '../../../../public/picture_newsletter.png';
import styles from './NewsLetter.module.sass';

export const NewsLetter = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setModalIsOpen(true);
        setError(null);
        setIsLoad(false);
      }, 1000);
    }
  }, [modalIsOpen, error]);

  return (
    <CustomModel
      isOpen={modalIsOpen}
      handleClick={() => setModalIsOpen(!modalIsOpen)}
    >
      <Box className={styles.modalMessageWrapper}>
        <Box
          className={styles.crossWrapper}
          onClick={() => setModalIsOpen(!modalIsOpen)}
        >
          <Close sx={{ width: '18px', height: '18px' }} />
        </Box>
        <Box className={styles.imageWrapper}>
          <Image src={picture} alt={'news letter'} className={styles.image} />
        </Box>
        <Box className={styles.modalTextWrapper}>
          <Box className={styles.title}>Sign up for updates on our launch!</Box>
          <Box className={styles.subtitle}>
            Sign up for our newsletter now and stay in the loop on all things
            FindMyCoach.
          </Box>
          <Box className={styles.inputsWrapper}></Box>
        </Box>
      </Box>
    </CustomModel>
  );
};
