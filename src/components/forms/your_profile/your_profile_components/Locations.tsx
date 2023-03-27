/* eslint-disable no-unused-vars */
import Input from '@/common/input/Input';
import { ILocationUI, TypeLocation } from '@/store/types/location/locationType';
import { Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import styles from '../YourProfile.module.sass';

const inputStyles = {
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

export interface ILocations {
  locationValuesInputs: ILocationUI[];
  handleChangeLocation: (
    e: { target: { value: string } },
    locationIndex: number,
    typeLocation: string
  ) => void;
  deleteLocationInputs: (value: number) => void;
  addMoreLocationInputs: () => void;
}

const Locations: React.FC<ILocations> = ({
  locationValuesInputs,
  handleChangeLocation,
  deleteLocationInputs,
  addMoreLocationInputs,
}) => {
  const matches600 = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Box className={styles.locationsSection}>
        <Box className={styles.locationsTitle}>
          <Typography variant="h4" className={styles.title}>
            Location
          </Typography>
          <Typography variant="subtitle1" className={styles.subtitle}>
            Choose one or two options.
          </Typography>
        </Box>
        <Box
          className={styles.locationInputsWrapper}
          sx={{ gap: matches600 ? 3 : 2 }}
        >
          {locationValuesInputs.map((value, index) => {
            return (
              <Box
                key={index}
                className={styles.inputsBox}
                sx={{ gap: matches600 ? 2.5 : 1.5, position: 'relative' }}
              >
                <Input
                  helperText={value.city.messageError}
                  isError={value.city.isError}
                  name={value.city.name}
                  label={'City'}
                  value={value.city.name}
                  sx={inputStyles}
                  onChange={(e) =>
                    handleChangeLocation(e, index, TypeLocation.city)
                  }
                  type="text"
                />
                <Input
                  name={value.street.name}
                  label={'Street'}
                  helperText={value.street.messageError}
                  isError={value.street.isError}
                  value={value.street.name}
                  sx={inputStyles}
                  onChange={(e) =>
                    handleChangeLocation(e, index, TypeLocation.street)
                  }
                  type="text"
                />
                <Input
                  name={value.postal_code.name}
                  label={'Post code'}
                  helperText={value.postal_code.messageError}
                  isError={value.postal_code.isError}
                  value={value.postal_code.name}
                  sx={{
                    ...inputStyles,
                    maxWidth: matches600 ? '100%' : '189px',
                  }}
                  onChange={(e) =>
                    handleChangeLocation(e, index, TypeLocation.postal_code)
                  }
                  type="string"
                />
                {value.icon && (
                  <Box
                    sx={{
                      position: 'absolute',
                      cursor: 'pointer',
                      right: matches600 ? '-5px' : '-11.8px',
                      top: matches600 ? '-15px' : '-10px',
                      width: '15px',
                      height: '15px',
                    }}
                    onClick={() => deleteLocationInputs(index)}
                  >
                    {value.icon}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box className={styles.locationsSection}>
        <Typography
          className={styles.locationBtn}
          onClick={addMoreLocationInputs}
        >
          + Add more locations
        </Typography>
      </Box>
    </>
  );
};

export default Locations;
