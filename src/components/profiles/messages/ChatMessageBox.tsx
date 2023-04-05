import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { UserType } from '@/store/types/user';
import { Stack } from '@mui/material';
import { useContext, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { Message } from './Message';
import { MessageContext } from './messageContext';

interface IChatMessageBox {
  selectedContactUUID: string;
}
export function ChatMessageBox({ selectedContactUUID }: IChatMessageBox) {
  const userType = useContext(MessageContext);
  if (!userType) {
    alert('NO USER TYPE');
  }

  const endAnchorRef = useRef<HTMLDivElement>(null);
  const firstRenderRef = useRef<boolean>(true);

  const { data } = useQuery(
    ['contactMessageList', selectedContactUUID],
    async () => {
      const request =
        userType === UserType.student
          ? studentClientApi.studentGetMessageCoach
          : coachClientApi.coachGetMessageStudent;
      const result = await request(selectedContactUUID);
      return result.messages;
    }
  );

  useEffect(() => {
    if (endAnchorRef.current && data) {
      endAnchorRef.current.scrollIntoView({
        behavior: firstRenderRef.current ? 'auto' : 'smooth',
      });
      firstRenderRef.current = false;
    }
  }, [data]);

  return (
    <Stack sx={{ overflowY: 'scroll' }}>
      <div className="end-anchor" ref={endAnchorRef}></div>

      {data &&
        data.map((item) => {
          return (
            <Message
              key={item.uuid}
              isOutgoing={item.author.uuid !== selectedContactUUID}
              text={item.text}
              date={item.created_at}
            />
          );
        })}
    </Stack>
  );
}
