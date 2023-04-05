import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { Box, Rating, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

interface IReviewFormProps {
  lessonUUID: string;
}

const ReviewForm = ({ lessonUUID }: IReviewFormProps) => {
  const router = useRouter();
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [rateText, setRateText] = useState<string>('');

  const sendReviewMutation = useMutation(async () => {
    const request = studentClientApi.studentSendSessionReview;
    const data = { text: rateText, rate: ratingValue };
    await request(data, lessonUUID);
  });

  function handleSendReview(): void {
    sendReviewMutation.mutate();
  }

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setModalIsOpen(true);
        router.push('/profiles/student?my_lessons');
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen]);
  const closeSuccessMessage = () => {
    setModalIsOpen(!modalIsOpen);
    router.push('/profiles/student?my_lessons');
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignContents: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '2.5%',
        }}
      >
        <Rating
          sx={{ fontSize: '4vw' }}
          name="simple-controlled"
          value={ratingValue}
          size="large"
          onChange={(e, newValue) => {
            setRatingValue(Number(newValue));
          }}
        />
        <TextField
          sx={{ width: '60%', marginTop: '2.5%' }}
          placeholder="Share your experience about coach"
          value={rateText}
          onChange={(e) => setRateText(e.target.value)}
          autoFocus={true}
          multiline
          rows={4}
          fullWidth
          inputProps={{
            maxLength: 1024,
            pattern: '[0-9]*',
            style: { fontSize: '16px', fontFamily: 'Inter' },
          }}
        />

        <Box
          sx={{
            backgroundColor: '#222CDF',
            marginTop: '2.5%',
            width: '60%',
            height: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignContents: 'center',
            alignItems: 'center',
            padding: '2%',
            gap: '10px',
            borderRadius: '8px',
            '&:hover': {
              background: ' #4d54e6',
              transition: 0.6,
              cursor: 'pointer',
            },
          }}
          onClick={handleSendReview}
        >
          <Typography
            fontSize={{
              lg: 16,
              md: 14,
              sm: 12,
              xs: 10,
            }}
            sx={{ fontFamily: 'Inter', color: 'white', fontWeight: '600' }}
          >
            Leave review
          </Typography>
        </Box>
      </Box>

      {sendReviewMutation.isError && !sendReviewMutation.isSuccess && (
        <CustomModel
          isOpen={modalIsOpen}
          handleClick={() => setModalIsOpen(!modalIsOpen)}
        >
          <MessageBox
            message={'Error while sendig a review'}
            handleClick={() => setModalIsOpen(!modalIsOpen)}
          />
        </CustomModel>
      )}
      {sendReviewMutation.isSuccess && (
        <CustomModel isOpen={modalIsOpen} handleClick={closeSuccessMessage}>
          <MessageBox
            message={'Review has been created'}
            handleClick={closeSuccessMessage}
          />
        </CustomModel>
      )}
    </>
  );
};

export default ReviewForm;
