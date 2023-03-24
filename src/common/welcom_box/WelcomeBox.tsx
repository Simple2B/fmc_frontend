import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import * as React from 'react';
import armIcon from '../../../public/arm_icon.png';

export interface IWelcomeBox {
  name: string;
}

const WelcomeBox: React.FC<IWelcomeBox> = ({ name }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ mr: '5px', fontSize: '32px', fontWeight: '600' }}>
        Welcome {name}
      </Typography>
      <Image src={armIcon} alt={'hello'} width={25} height={25} />
    </Box>
  );
};

export default WelcomeBox;
