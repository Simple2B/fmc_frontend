import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { Box, Button, TextField, styled } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
interface ChatSendMessageAreaProps {
  receiverUUID: string;
}

export function ChatSendMessageArea({
  receiverUUID,
}: ChatSendMessageAreaProps) {
  const [messageInput, setMessageInput] = useState<string>('');
  const queryClient = useQueryClient();
  const WhiteBorderTextField = styled(TextField)`
    & label.Mui-focused {
      color: white;
    }
    & .MuiOutlinedInput-root {
      &.Mui-focused fieldset {
        border-color: #dbdbdb;
      }
    }
  `;
  const sendMessageMutation = useMutation(
    async () => {
      await studentClientApi.studentSendMessageCoach({
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
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setMessageInput(e.target.value);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          heght: '25%',
        }}
      >
        <Box
          sx={{
            width: '95%',
            heght: '100%',
            marginRight: '2.5%',
            marginLeft: '2.5%',
            marginBottom: '1%',
          }}
        >
          <WhiteBorderTextField
            value={messageInput}
            onChange={handleInputChange}
            autoFocus={true}
            multiline
            rows={3}
            fullWidth
            InputProps={{
              endAdornment: (
                <Button
                  onClick={handleSendMessage}
                  sx={{
                    width: '15%',
                    fontFamily: 'Inter',
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    color: 'white',
                    backgroundColor: '#222CDF',
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

              style: { fontSize: '1rem', fontFamily: 'Inter' },
            }}
          ></WhiteBorderTextField>
        </Box>
      </Box>
    </>
  );
}
