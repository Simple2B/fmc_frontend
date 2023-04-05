import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Paper,
} from '@mui/material';
import * as React from 'react';

export interface ICoachSearchInput {
  name: string;
  address: string;
  // eslint-disable-next-line no-unused-vars
  onChangeName: (value: string) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeAddress: (value: string) => void;
}

const CoachSearchInput: React.FC<ICoachSearchInput> = ({
  name,
  address,
  onChangeName,
  onChangeAddress,
}) => {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: 60,
        position: 'relative',
        left: 0,
        margin: '0 24px',
        backgroundColor: 'rgba(255, 255, 255, 1)',
      }}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          flex={1}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: '' }}
            placeholder={'Search a coach'}
            inputProps={{ 'aria-label': 'search google maps' }}
            autoFocus
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Box>
        <Box
          flex={1}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: '' }}
            placeholder={'Address'}
            inputProps={{ 'aria-label': 'search google maps' }}
            autoFocus
            value={address}
            onChange={(e) => onChangeAddress(e.target.value)}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Box>

        {/* <Box
          flex={1}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: '' }}
            placeholder={'Address'}
            inputProps={{ 'aria-label': 'search google maps' }}
          />
        </Box> */}
      </Box>

      <Box>
        <Button
          sx={{
            position: 'absolute',
            textTransform: 'capitalize',
            top: '7px',
            right: '6px',
            color: '#FFF',
            backgroundColor: '#1664C0',
            width: '108px',
            height: '46px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#F05547',
            },
          }}
        >
          Search
        </Button>
      </Box>
    </Paper>
  );
};

export default CoachSearchInput;
