import { Box } from '@mui/material';
import * as React from 'react';
import style from './VideoBox.module.sass';

export interface IVideoBox {}

const VideoBox: React.FC<IVideoBox> = () => {
  return (
    <Box className={style.wrapperVideo}>
      <video autoPlay muted loop id="myVideo" className={style.video}>
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
