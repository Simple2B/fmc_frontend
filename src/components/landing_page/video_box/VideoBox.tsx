import { Box } from '@mui/material';
import * as React from 'react';

export interface IVideoBox {}

const VideoBox: React.FC<IVideoBox> = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '932px',
        top: 0,
        right: 0,
        left: 0,
      }}
    >
      <video autoPlay muted loop id="myVideo">
        <source
          src={
            'https://find-my-coach.s3.amazonaws.com/assets/pexels-cottonbro-10340715.mp4'
          }
          type="video/mp4"
        />
      </video>
    </Box>
  );
};

export default VideoBox;
