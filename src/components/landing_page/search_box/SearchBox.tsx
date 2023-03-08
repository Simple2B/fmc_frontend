import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
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
      <IconButton
        color="primary"
        sx={{ p: '10px', pr: '330px', position: 'relative' }}
        aria-label="directions"
      >
        {/* <DirectionsIcon /> */}
        <Button
          sx={{
            position: 'absolute',
            right: '3px',
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
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
