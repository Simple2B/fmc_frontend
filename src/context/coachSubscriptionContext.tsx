import { coachSubscriptionApi } from '@/fast_api_backend/api/authApi/coach/subscription';
import { ICoachSubscription } from '@/store/types/users/coach/profileType';
import React, { createContext, PropsWithChildren, useState } from 'react';
import { useQuery } from 'react-query';

export const CoachSubscriptionContextContext =
  createContext<ICoachSubscription | null>(null);

export const CoachProfileContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [coachDetailProfile, setCoachDetailProfile] =
    useState<ICoachSubscription | null>(null);

  useQuery<ICoachSubscription, ErrorConstructor>(
    ['coachSubscription'],
    async () => {
      const request = coachSubscriptionApi.getSubscription();
      const result = await request;
      // console.log('[Your profile] coach result', result);
      setCoachDetailProfile(result);
      return result;
    },
    {}
  );

  return (
    <CoachSubscriptionContextContext.Provider value={coachDetailProfile}>
      {children}
    </CoachSubscriptionContextContext.Provider>
  );
};
