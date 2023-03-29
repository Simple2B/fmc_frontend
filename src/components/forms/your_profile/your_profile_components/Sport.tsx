/* eslint-disable no-unused-vars */
import { Autocomplete, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import styles from '../YourProfile.module.sass';

const nameInputStyles = {
  mt: 4,
  '& .MuiInputBase-root': {
    position: 'relative',
  },
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '-20px',
  },
};

export interface ISport {
  options: { id: number; label: string }[];
  sport: { id: number; label: string }[];
  onChangeSport: (
    event: any,
    newValue: React.SetStateAction<{ id: number; label: string }[]>
  ) => void;
  errorSportMessage: string;
  isErrorSport: boolean;
}

const Sport: React.FC<ISport> = ({
  options,
  sport,
  onChangeSport,
  errorSportMessage,
  isErrorSport,
}) => {
  return (
    <Box className={styles.inputBox}>
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => `${option.label}`}
        value={sport}
        isOptionEqualToValue={(o, v) => o.label === v.label}
        renderOption={(props, options) => (
          <Box component={'li'} {...props} key={options.id}>
            {options.label}
          </Box>
        )}
        onChange={(event, newValue) => {
          onChangeSport(event, newValue);
        }}
        sx={nameInputStyles}
        renderInput={(params) => (
          <TextField
            {...params}
            label={'Sport'}
            helperText={errorSportMessage}
            sx={{
              '& .MuiFormHelperText-root': {
                color: 'red',
              },
            }}
            error={isErrorSport}
          />
        )}
      />
    </Box>
  );
};

export default Sport;
