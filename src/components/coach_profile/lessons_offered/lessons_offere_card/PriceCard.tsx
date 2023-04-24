import { UserType } from '@/store/types/user';
import { PaymentCheckState } from '@/store/types/users/coach/profileType';
import { Box, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import InfoModalSchedule from './booked_info_forms/InfoModalSchedule';
import InfoModelSignInSignUP from './booked_info_forms/InfoModalSignInSignUP';

const testData = [
  {
    title: '1 hours',
    price: 65,
    disable: false,
  },
  {
    title: '3 hours',
    price: 180,
    subTitle: 'You save 30$',
    disable: true,
  },
  {
    title: '6 hours',
    price: 360,
    subTitle: 'You save 30$',
    disable: true,
  },
];

export interface IPriceCard {
  price?: number;
  isLogIn: boolean | null;
  userType: string | null;
  isPaymentCheck: PaymentCheckState;
  setIsPaymentCheck: React.Dispatch<React.SetStateAction<PaymentCheckState>>;
}

const PriceCard: React.FC<IPriceCard> = ({
  price,
  isLogIn,
  userType,
  isPaymentCheck,
  setIsPaymentCheck,
}) => {
  const matches950 = useMediaQuery('(max-width:950px)');
  const [packagesDataPrice, setPackagesDataPrice] = useState<
    {
      title: string;
      price: number;
      subTitle?: string;
      disable: boolean;
    }[]
  >(testData);
  const [isOpenLogIn, setIsOpenLogIn] = useState<boolean>(false);
  const [isBookSession, setIsBookSession] = useState<boolean>(false);

  const handleClickInfoModelSignInSignUP = () => {
    setIsOpenLogIn(!isOpenLogIn);
  };

  const handleClickBookSession = () => {
    setIsBookSession(!isBookSession);
  };

  useEffect(() => {
    setPackagesDataPrice(
      testData.map((packageData, index) => {
        if (index === 0) {
          return {
            title: packageData.title,
            price: price ? price / 100 : packageData.price,
            disable: packageData.disable,
          };
        }
        if (index === 1) {
          return {
            title: packageData.title,
            price: price
              ? Math.round((price / 100) * 3 - (price / 100) * 3 * 0.3)
              : packageData.price,
            subTitle: packageData.subTitle,
            disable: packageData.disable,
          };
        }
        if (index === 2) {
          return {
            title: packageData.title,
            price: price
              ? Math.round((price / 100) * 6 - (price / 100) * 6 * 0.3)
              : packageData.price,
            subTitle: packageData.subTitle,
            disable: packageData.disable,
          };
        }
        return packageData;
      })
    );
  }, [price]);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: matches950 ? 'center' : 'space-around',
        alignItems: 'center',
        flexWrap: matches950 ? 'wrap' : 'nowrap',
      }}
      gap={matches950 ? 2.5 : 1}
    >
      {packagesDataPrice.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0px 0px 5px rgba(114, 112, 112, 0.25)',
              borderRadius: '10px',
              p: '50px 28px',
            }}
          >
            {item.subTitle && (
              <Box
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  fontWeight: '400',
                  color: 'rgba(0, 0, 0, 0.87)',
                  position: 'absolute',
                  top: '-13px',
                  p: '5px 15px',
                  backgroundColor: 'rgba(240, 85, 71, 0.29)',
                  borderRadius: '8px',
                }}
              >
                {item.subTitle}
              </Box>
            )}
            <Box
              sx={{
                width: '100%',
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                color: '#394454',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pb: '18px',
              }}
            >
              {item.title}
            </Box>
            <Box
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '28px',
                fontWeight: '600',
                color: '#F05547',
                pb: '30px',
              }}
            >
              {/* TODO: price for first package (in next step of work will be add all packages info of coach) */}
              £{item.price}
            </Box>
            <Box
              sx={{
                fontFamily: 'Work Sans, sans-serif',
                fontWeight: 600,
                fontSize: '18px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: '13px 19px',
                borderRadius: '7px',
                color: '#ffffff',
                backgroundColor: item.disable ? 'grey' : '#222CDF',
                cursor: 'pointer',
                transition: 'ease-in-out 0.3s all',
                '&:hover': {
                  backgroundColor: item.disable ? 'grey' : '#222CDF',
                  transition: 'ease-in-out 0.3s all',
                },
              }}
              onClick={() => {
                if (item.disable) return;
                if (userType === UserType.coach || !isLogIn) {
                  setIsOpenLogIn(true);
                }
                if (isLogIn && userType === UserType.student) {
                  setIsBookSession(true);
                }
              }}
            >
              Select
            </Box>
          </Box>
        );
      })}
      {isOpenLogIn && (
        <InfoModelSignInSignUP
          isOpenLogIn={isOpenLogIn}
          handleClick={handleClickInfoModelSignInSignUP}
        />
      )}
      {isBookSession && (
        <InfoModalSchedule
          isBookSession={isBookSession}
          handleClick={handleClickBookSession}
          isLogIn={isLogIn}
          userType={userType}
          isPaymentCheck={isPaymentCheck}
          setIsPaymentCheck={setIsPaymentCheck}
        />
      )}
    </Box>
  );
};

export default PriceCard;
