import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { Box } from '@mui/material';
import { useQuery } from 'react-query';
import { Message } from './Message';

interface IChatMessageBox {
  selectedContactUUID: string;
}
export function ChatMessageBox({ selectedContactUUID }: IChatMessageBox) {
  const { data } = useQuery(
    ['contactMessageList', selectedContactUUID],
    async () => {
      const result = await studentClientApi.studentGetMessageCoach(
        selectedContactUUID
      );
      console.log('--------------> messages', result);
      return result.messages;
    }
  );

  return (
    <>
      <Box
        sx={{
          marginTop: '1%',
          marginBottom: '1%',
          width: '100%',
          height: 'auto',
          minHeight: '80%',
        }}
      >
        {data &&
          data.map((item) => {
            return (
              <Message
                key={item.uuid}
                isOutgoing={item.author.uuid !== selectedContactUUID}
                text={item.text}
              />
            );
          })}
      </Box>
    </>
  );
}
