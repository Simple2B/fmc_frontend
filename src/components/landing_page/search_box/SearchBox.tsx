import SearchIcon from '@mui/icons-material/Search';
import { Box, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

export interface ISearchInput {}

const SearchInput: React.FC<ISearchInput> = () => {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 587,
        height: 60,
        position: 'relative',
      }}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search a coach, sport"
        inputProps={{ 'aria-label': 'search google maps' }}
      />

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Box sx={{ pr: '330px' }}>
        <Button
          sx={{
            position: 'absolute',
            top: '7px',
            right: '6px',
            color: '#FFF',
            backgroundColor: '#F05547',
            width: '108px',
            height: '46px',
            borderRadius: '8px',
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
