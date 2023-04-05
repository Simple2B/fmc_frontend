import { IContact } from '@/store/types/message/messageType';
import { IUserProfile, UserType } from '@/store/types/user';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { ChatContacts } from './ChatContacts';
import { ChatMessages } from './ChatMessages';
import { MessageContext } from './messageContext';

export interface IMessagesProps {
  userType: UserType;
  data?: IContact[];
  selectedContact: IUserProfile | null;
  // eslint-disable-next-line no-unused-vars
  onContactSelected: (contactUUID: string) => void;
}

const Messages: React.FC<IMessagesProps> = ({
  userType,
  data,
  selectedContact,
  onContactSelected,
}) => {
  const router = useRouter();
  console.log('==== router uuid ', router.asPath.split('user=')[1]);
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
