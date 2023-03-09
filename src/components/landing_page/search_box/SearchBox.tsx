import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, useMediaQuery } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

export interface ISearchInput {}

const SearchInput: React.FC<ISearchInput> = () => {
  const matches845 = useMediaQuery('(max-width:845px)');
  const matches445 = useMediaQuery('(max-width:445px)');
  const matches320 = useMediaQuery('(max-width:320px)');
  return (
    <Paper
      component="form"
      sx={{
        p: matches320 ? '' : '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: matches445 ? 300 : matches845 ? 400 : 587,
        height: matches445 ? 33 : matches845 ? 45 : 60,
        position: 'relative',
        left: matches320 ? '-6px' : 0,
        backgroundColor: matches320
          ? 'rgba(255, 255, 255, 0.7)'
          : 'rgba(255, 255, 255, 1)',
      }}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: matches845 ? '12px' : '' }}
        placeholder={matches445 ? 'Search' : 'Search a coach, sport'}
        inputProps={{ 'aria-label': 'search google maps' }}
      />

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Box sx={{ pr: matches445 ? '150px' : matches845 ? '210px' : '330px' }}>
        <Button
          sx={{
            position: 'absolute',
            textTransform: 'capitalize',
            top: matches845 ? '4.5px' : '7px',
            right: '6px',
            color: '#FFF',
            backgroundColor: '#F05547',
            width: matches445 ? '' : matches845 ? '88px' : '108px',
            height: matches445 ? '24px' : matches845 ? '26px' : '46px',
            borderRadius: matches845 ? '4px' : '8px',
            '&:hover': {
              backgroundColor: 'grey',
            },
          }}
        >
          Search
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchInput;
