import { Autocomplete, Box, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';

const nameInputStyles = {
  color: 'rgba(0, 0, 0, 1)',
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

export interface IFormSchedule {
  dayName: string;
  timeStart: string;
  timeEnd: string;
  packageSchedule: {
    name: string;
    id: number;
  } | null;
  packagesSchedule: {
    name: string;
    id: number;
  }[];
  setPackage: React.Dispatch<
    React.SetStateAction<{
      name: string;
      id: number;
    } | null>
  >;
  openForm: () => void;
  btnTitle: string;
  handleClickSchedule: () => void;
}

const FormSchedule: React.FC<IFormSchedule> = ({
  dayName,
  timeStart,
  timeEnd,
  packageSchedule,
  packagesSchedule,
  setPackage,
  openForm,
  btnTitle,
  handleClickSchedule,
}) => {
  const router = useRouter();
  const packages = packagesSchedule.map((p) => p.name);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        zIndex: 10000,
      }}
    >
      {packagesSchedule[0].id !== 0 ? (
        <Box
          sx={{
            width: '396px',
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'flex-start',
            border: '1px solid #DBDBDB',
            boxShadow: '0px 2px 14px rgba(0, 0, 0, 0.12)',
            borderRadius: '14px',
            backgroundColor: '#FFFFFF',
            p: '32px',
          }}
        >
          <Box
            sx={{
              fontFamily: 'Inter, sens-serif',
              fontSize: '20px',
              fontWeight: 400,
              color: '#333333',
              borderBottom: '1px solid #333333',
              mb: '20px',
            }}
          >
            {dayName}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: '16px',
            }}
          >
            <Box
              sx={{
                fontFamily: 'Inter, sens-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#333333',
                p: '8px',
                border: '1px solid #DEDEDD',
                borderRadius: '6px',
                mr: '5px',
              }}
            >
              {timeStart}
            </Box>
            <Box sx={{ mr: '5px' }}> - </Box>
            <Box
              sx={{
                fontFamily: 'Inter, sens-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#333333',
                p: '8px',
                border: '1px solid #DEDEDD',
                borderRadius: '6px',
              }}
            >
              {timeEnd}
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                fontFamily: 'Inter, sens-serif',
                fontSize: '12px',
                fontWeight: 400,
                textTransform: 'uppercase',
                color: '#9E9E9E',
                mb: '16px',
                mt: '16px',
              }}
            >
              Package
            </Box>
            <Autocomplete
              disablePortal
              value={packageSchedule ? packageSchedule.name : ''}
              onChange={(event: any, newValue: string | null) => {
                const packageData = packagesSchedule.filter(
                  (p) => p.name === newValue
                );
                let id = 0;
                if (packageData.length === 1) {
                  id = packageData[0].id;
                }
                setPackage({
                  name: newValue ?? '',
                  id: id,
                });
              }}
              id="package"
              options={packages}
              sx={{ ...nameInputStyles, width: '100%' }}
              renderInput={(params: any) => (
                <TextField {...params} label="Package" />
              )}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}
          ></Box>

          <Box sx={{ mt: '36px', width: '100%' }}>
            <Box sx={{ width: '100%', border: '1px solid #DBDBDB' }} />
            <Box
              sx={{
                mt: '16px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >
              <Box
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '64px',
                  height: '32px',
                  fontFamily: 'Inter, sens-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#333333',
                  transition: 'easeOut 0.3s all',
                  '&:hover': {
                    color: '#F05547',
                    transition: 'easeOut 0.3s all',
                  },
                }}
                onClick={openForm}
              >
                Cancel
              </Box>
              <Box
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '64px',
                  height: '32px',
                  fontFamily: 'Inter, sens-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#ffffff',
                  backgroundColor:
                    packageSchedule?.name.length === 0 ? 'grey' : '#F05547',
                  borderRadius: '6px',
                  transition: 'easeOut 0.3s all',
                  '&:hover': {
                    boxShadow:
                      packageSchedule?.name.length === 0
                        ? 'none'
                        : '0px 0px 5px #F05547',
                    transition: 'easeOut 0.3s all',
                  },
                }}
                onClick={() => {
                  if (packageSchedule?.name.length === 0) return;
                  handleClickSchedule();
                }}
              >
                {btnTitle}
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            // width: '400px',
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'flex-start',
            border: '1px solid #DBDBDB',
            boxShadow: '0px 2px 14px rgba(0, 0, 0, 0.12)',
            borderRadius: '14px',
            backgroundColor: '#FFFFFF',
            p: '32px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Inter, sens-serif',
              fontSize: '20px',
              fontWeight: 400,
              color: '#333333',
            }}
          >
            <Box>No packages! You must </Box>
            <Box
              sx={{
                m: 'auto 5px',
                color: '#222CDF',
                borderBottom: '1px solid #222CDF',
                cursor: 'pointer',
                '&:hover': {
                  color: '#F05547',
                  borderBottom: '1px solid #F05547',
                },
              }}
              onClick={() => router.push('/profiles/coach?packages')}
            >
              create
            </Box>{' '}
            <Box>a package</Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              mt: '16px',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '64px',
                height: '32px',
                fontFamily: 'Inter, sens-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#333333',
                transition: 'easeOut 0.3s all',
                '&:hover': {
                  color: '#F05547',
                  transition: 'easeOut 0.3s all',
                },
              }}
              // () => setIsOpenFormEventCreate(!openFormEventCreate)
              onClick={openForm}
            >
              Cancel
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FormSchedule;
