import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, useMediaQuery } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import { useState } from 'react';

export interface IBtnSearch {
  searchCoaches: () => void;
}

const BtnSearch: React.FC<IBtnSearch> = ({ searchCoaches }) => {
  const matches845 = useMediaQuery('(max-width:845px)');
  const matches445 = useMediaQuery('(max-width:445px)');
  return (
    <Button
      sx={{
        position: 'absolute',
        textTransform: 'capitalize',
        top: matches845 ? '4.5px' : '7px',
        right: '6px',
        color: '#FFF',
        backgroundColor: '#222CDF',
        width: matches445 ? '' : matches845 ? '88px' : '108px',
        height: matches445 ? '24px' : matches845 ? '36px' : '46px',
        borderRadius: matches845 ? '4px' : '8px',
        '&:hover': {
          backgroundColor: '#3843e0',
        },
      }}
      onClick={searchCoaches}
    >
      Search
    </Button>
  );
};

export interface ISearchInput {
  sports?: {
    id: number;
    name: string;
    isActive: boolean;
  }[];
  children?: any;
}

const SearchInput: React.FC<ISearchInput> = ({ sports, children }) => {
  const router = useRouter();
  const matches970 = useMediaQuery('(max-width:970px)');
  const matches845 = useMediaQuery('(max-width:845px)');
  const matches445 = useMediaQuery('(max-width:445px)');
  const matches320 = useMediaQuery('(max-width:320px)');

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const searchCoaches = () => {
    router.push(
      {
        pathname: '/coach_search',
        query: {
          name: name,
          sportsIdes: sports
            ? sports.filter((s) => s.isActive).map((s) => s.id)
            : '',
          address: address,
        },
      },
      '/coach_search'
    );
  };

  return (
    <Paper
      component="form"
      sx={{
        p: matches320 ? '' : '2px 4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: matches320 ? 280 : matches445 ? 300 : matches845 ? 488 : 674,
        height: matches445 ? 33 : matches845 ? 45 : 60,
        position: 'relative',
        left: matches320 ? '-15px' : 0,
        backgroundColor: matches320
          ? 'rgba(255, 255, 255, 0.7)'
          : 'rgba(255, 255, 255, 1)',
      }}
    >
      {!matches970 && (
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      )}

      <Box
        sx={{
          ml: 1,
          width: matches320 ? 140 : matches445 ? 150 : matches845 ? 200 : 283,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        flex={1}
      >
        <InputBase
          sx={{
            ml: 1,
            width: '100%',
            fontSize: matches845 ? '12px' : '',
          }}
          placeholder={matches445 ? 'Search' : 'Search a coach'}
          inputProps={{ 'aria-label': 'search google maps' }}
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Box>
      <Box
        sx={{
          ml: 1,
          width: matches320 ? 140 : matches445 ? 150 : matches845 ? 200 : 283,
        }}
        flex={1}
      >
        <InputBase
          sx={{
            ml: 1,
            fontSize: matches845 ? '12px' : '',
            width: '100%',
          }}
          placeholder={'Address'}
          inputProps={{ 'aria-label': 'search google maps' }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Box>

      <Box sx={{ width: matches445 ? '' : matches845 ? '88px' : '108px' }}>
        {children ? (
          children
        ) : matches970 ? (
          <Box
            sx={{
              cursor: 'pointer',
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              top: '14%',
              right: '1%',
              width: '55px',
              height: '75%',
              borderRadius: '4px',
              border: '1px solid #F05547',
              backgroundColor: '#F05547',
            }}
            onClick={searchCoaches}
          >
            <SearchIcon sx={{ color: '#ffffff' }} />
          </Box>
        ) : (
          <BtnSearch searchCoaches={searchCoaches} />
        )}
      </Box>
    </Paper>
  );
};

export default SearchInput;
