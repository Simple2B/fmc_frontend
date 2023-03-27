import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { UserType } from '@/store/types/user';
import { Box, Button, TextField } from '@mui/material';
import { ChangeEventHandler, useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { MessageContext } from './messageContext';
interface ChatSendMessageAreaProps {
  receiverUUID: string;
}

export function ChatSendMessageArea({
  receiverUUID,
}: ChatSendMessageAreaProps) {
  const userType = useContext(MessageContext);
  const [messageInput, setMessageInput] = useState<string>('');
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation(
    async () => {
      const request =
        userType === UserType.student
          ? studentClientApi.studentSendMessageCoach
          : coachClientApi.coachSendMessageStudent;

      await request({
        receiver_id: receiverUUID,
        text: messageInput,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contactMessageList');
        setMessageInput('');
      },
    }
  );

  function handleSendMessage(): void {
    sendMessageMutation.mutate();
  }
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMessageInput(e.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          heght: '15%',
          backgroundColor: '#fff',
        }}
      >
        <Box
          sx={{
            position: 'sticky',
            width: '97.5%',
            heght: '100%',
            margin: '1% 2.5%',
          }}
        >
          <TextField
            value={messageInput}
            onChange={handleInputChange}
            autoFocus={true}
            multiline
            rows={2}
            fullWidth
            inputProps={{
              maxLength: 1024,
            }}
            InputProps={{
              endAdornment: (
                <Button
                  disabled={!messageInput}
                  onClick={handleSendMessage}
                  sx={{
                    width: '15%',
                    fontFamily: 'Inter',
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    color: 'white',
                    backgroundColor: !messageInput ? 'white' : '#222CDF',
                    borderRadius: '0.5rem',
                    '&:hover': {
                      color: 'white',
                      backgroundColor: '#222CDF',
                      tranparent: '0.8',
                    },
                  }}
                >
                  Send a messsage
                </Button>
              ),

              style: { fontSize: '0.9rem', fontFamily: 'Inter' },
            }}
          ></TextField>
        </Box>
      </Box>
    </>
  );
}
