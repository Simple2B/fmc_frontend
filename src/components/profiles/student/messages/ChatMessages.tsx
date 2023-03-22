import { ICoachProfile } from '@/store/types/users/coach/coachType';
import { IStudentProfile } from '@/store/types/users/student/studentType';
import { Box } from '@mui/material';
import { ChatHeader } from './ChatHeader';
import { ChatMessageBox } from './ChatMessageBox';
import { ChatSendMessageArea } from './ChatSendMessageArea';

interface IChatMessagesProps {
  selectedContact: ICoachProfile | IStudentProfile | null;
}

export function ChatMessages({ selectedContact }: IChatMessagesProps) {
  return (
    <>
      {selectedContact ? (
        <Box
          sx={{
            width: '100%',
            height: 900,
            overflow: 'hidden',
            overflowY: 'scroll',
            border: '0.5px solid #DBDBDB',
          }}
        >
          <ChatHeader
            selectedContactFirstName={selectedContact.first_name}
            selectedContactLastName={selectedContact.last_name}
            selectedContactUUID={selectedContact.uuid}
          />
          <ChatMessageBox selectedContactUUID={selectedContact.uuid} />
          <ChatSendMessageArea receiverUUID={selectedContact.uuid} />
        </Box>
      ) : (
        'Please select contact from list'
      )}
    </>
  );
}
