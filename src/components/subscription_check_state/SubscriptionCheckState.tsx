import { SubscriptionCheckState } from '@/store/types/users/coach/profileType';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import MessageSubscription from '../message_subscription/MessageSubscription';

// eslint-disable-next-line no-unused-vars
export interface ISubscriptionCheckState {}

const SubscriptionCheck: React.FC<ISubscriptionCheckState> = () => {
  const router = useRouter();

  const [isSubscriptionCheck, setIsSubscriptionCheck] =
    useState<SubscriptionCheckState>(SubscriptionCheckState.PENDING);

  useEffect(() => {
    const success = router.asPath.includes('success');
    const cancel = router.asPath.includes('cancel');
    if (success) {
      setIsSubscriptionCheck(SubscriptionCheckState.ACTIVE);
      router.push('/profiles/coach?my_appointments');
    }
    if (cancel) {
      setIsSubscriptionCheck(SubscriptionCheckState.CANCELLED);
      router.push('/profiles/coach?my_appointments');
    }
  }, [router.asPath]);

  useEffect(() => {
    if (isSubscriptionCheck !== SubscriptionCheckState.PENDING) {
      const isSubscribe = setTimeout(() => {
        setIsSubscriptionCheck(SubscriptionCheckState.PENDING);
        // router.push('/profiles/coach?my_appointments#lesson_requests');
      }, 3000);
      return () => clearTimeout(isSubscribe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubscriptionCheck]);

  const closeSuccessMessage = () => {
    setIsSubscriptionCheck(SubscriptionCheckState.PENDING);
    router.push('/profiles/coach?my_appointments#lesson_requests');
  };

  const closeCancelMessage = () => {
    setIsSubscriptionCheck(SubscriptionCheckState.PENDING);
    router.push('/profiles/coach?my_appointments');
  };
  return (
    <>
      {isSubscriptionCheck === SubscriptionCheckState.ACTIVE && (
        <MessageSubscription
          message={'You have successfully subscribed'}
          isSubscription={isSubscriptionCheck === SubscriptionCheckState.ACTIVE}
          closeSuccessMessage={closeSuccessMessage}
        />
      )}
      {isSubscriptionCheck === SubscriptionCheckState.CANCELLED && (
        <MessageSubscription
          message={'Subscription was not completed'}
          isSubscription={
            isSubscriptionCheck === SubscriptionCheckState.CANCELLED
          }
          closeSuccessMessage={closeCancelMessage}
        />
      )}
    </>
  );
};

export default SubscriptionCheck;
