import { IUserProfile } from '@/store/types/user';
import { Box, Typography } from '@mui/material';
import { ChatHeader } from './ChatHeader';
import { ChatMessageBox } from './ChatMessageBox';
import { ChatSendMessageArea } from './ChatSendMessageArea';

interface IChatMessagesProps {
  selectedContact: IUserProfile | null;
}

export function ChatMessages({ selectedContact }: IChatMessagesProps) {
  return (
    <>
      {selectedContact ? (
        <Box
          sx={{
            width: '100%',
            height: '850px',
            position: 'relative',

            border: '0.5px solid #DBDBDB',
          }}
        >
          <ChatHeader
            selectedContactFirstName={selectedContact.first_name}
            selectedContactLastName={selectedContact.last_name}
            selectedContactUUID={selectedContact.uuid}
          />
          <Box
            sx={{
              maxHeight: '80%',
              overflow: 'auto',
            }}
          >
            <ChatMessageBox selectedContactUUID={selectedContact.uuid} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              bottom: '0',
              right: '0',
              left: '0',
            }}
          >
            <ChatSendMessageArea receiverUUID={selectedContact.uuid} />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
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
            Please select a contact
          </Typography>
        </Box>
      )}
    </>
  );
}
