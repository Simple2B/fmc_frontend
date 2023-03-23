import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { UserType } from '@/store/types/user';
import { ICoachProfile } from '@/store/types/users/coach/coachType';
import { IStudentProfile } from '@/store/types/users/student/studentType';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ChatContacts } from './ChatContacts';
import { ChatMessages } from './ChatMessages';
import { MessageContext } from './messageContext';

export interface IMessagesProps {
  userType: UserType;
}

const Messages: React.FC<IMessagesProps> = ({ userType }) => {
  const [selectedContact, setSelectedContact] = useState<
    ICoachProfile | IStudentProfile | null
  >(null);
  const { data } = useQuery(
    ['contacts'],
    async () => {
      const request =
        userType === UserType.student
          ? studentClientApi.studentContactsList
          : coachClientApi.coachContactList;
      const result = await request();

      console.log('--------------> contacts', result);
      return result.contacts;
    },
    {
      refetchInterval: 10000,
    }
  );

  const onContactSelected = (contactUUID: string) => {
    const foundContact = data?.find((element) => {
      return element.user.uuid === contactUUID;
    });
    if (!foundContact) {
      return;
    }
    setSelectedContact(foundContact.user);
  };

  return (
    <MessageContext.Provider value={userType}>
      <Box
        alignItems={'center'}
        display={'flex'}
        width={'100%'}
        height={'0 auto'}
      >
        {data && data.length > 0 ? (
          <>
            <ChatContacts
              contacts={data}
              selectedContactUUID={selectedContact?.uuid ?? ''}
              onContactSelected={onContactSelected}
            />
            <ChatMessages selectedContact={selectedContact} />
          </>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <Typography
              fontSize={{
                lg: 20,
                md: 16,
                sm: 12,
                xs: 10,
              }}
              fontFamily={'Inter'}
              fontWeight={'bold'}
            >
              You have no chats yet
            </Typography>
          </Box>
        )}
      </Box>
    </MessageContext.Provider>
  );
};

export default Messages;
