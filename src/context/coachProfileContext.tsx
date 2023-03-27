import { coachProfileApi } from '@/fast_api_backend/api/usersInstance/coach/profileInstance';
import { IYourProfile } from '@/store/types/users/coach/profileType';
import React, { createContext, PropsWithChildren, useState } from 'react';
import { useQuery } from 'react-query';

export const CoachProfileContextContext = createContext<IYourProfile>({
  about: '',
  certificates: [],
  email: '',
  first_name: '',
  is_for_adults: true,
  is_for_children: false,
  is_verified: true,
  last_name: '',
  locations: [{ city: '', street: '', postal_code: '' }],
  profile_picture: '',
  sports: [],
  username: '',
  uuid: '',
});

export const CoachProfileContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [coachDetailProfile, setCoachDetailProfile] = useState<IYourProfile>({
    about: '',
    certificates: [],
    email: '',
    first_name: '',
    is_for_adults: true,
    is_for_children: false,
    is_verified: true,
    last_name: '',
    locations: [{ city: '', street: '', postal_code: '' }],
    profile_picture: '',
    sports: [],
    username: '',
    uuid: '',
  });
  useQuery<IYourProfile, ErrorConstructor>(
    ['coachProfile'],
    async () => {
      const request = coachProfileApi.getInfoProfile();
      const result = await request;
      console.log('[Your profile] coach result', result);
      setCoachDetailProfile(result);
      return result;
    },
    {}
  );

  return (
    <CoachProfileContextContext.Provider value={coachDetailProfile}>
      {children}
    </CoachProfileContextContext.Provider>
  );
};
