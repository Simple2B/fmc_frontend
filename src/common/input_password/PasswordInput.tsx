import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as React from 'react';
import style from './PasswordInput.module.sass';

export interface IPasswordInput {
  isError: boolean;
  helperText: string;
  label: string;
  value: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  hidePassword: boolean;
  handleChange(
    // eslint-disable-next-line no-unused-vars
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    // eslint-disable-next-line no-unused-vars
    e: { target: { value: string } }
  ): void;
  // eslint-disable-next-line no-unused-vars
  showPassword(
    // eslint-disable-next-line no-unused-vars
    setHidePassword: React.Dispatch<React.SetStateAction<boolean>>
  ): void;
  setHidePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line no-empty-pattern
const PasswordInput: React.FC<IPasswordInput> = ({
  isError,
  helperText,
  label,
  value,
  setPassword,
  hidePassword,
  handleChange,
  showPassword,
  setHidePassword,
}) => {
  const inputStyle = {
    WebkitBoxShadow: '0 0 0 1000px #FFF inset',
    WebkitTextFillColor: '#000',
  };
  return (
    <FormControl
      sx={{ mt: 4, width: '100%', position: 'relative' }}
      variant="outlined"
    >
      <InputLabel
        htmlFor="outlined-adornment-password"
        sx={{ width: '100%', color: 'rgba(0, 0, 0, 0.87)' }}
        error={isError}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={!hidePassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => handleChange(setPassword, e)}
        required
        error={isError}
        sx={{
          width: '100%',
          paddingRight: '0',
          //   '.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
          //     bgcolor: '#1F2A40',
          //   },
          //   '.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
          //     border: '1px solid #A9D3DE',
          //   },
          //   '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
          //     color: '#A9D3DE',
          //   },
          //   '& .css-yjsfm1 span': { color: '#A9D3DE' },
          //   '&:hover': {
          //     '.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
          //       border: '1px solid #A9D3DE',
          //     },
          //     '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
          //       color: '#A9D3DE',
          //     },
          //     '.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root': {
          //       color: '#A9D3DE',
          //     },
          //   },
          //   '.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root': {
          //     color: '#A9D3DE',
          //   },
        }}
        inputProps={{ style: inputStyle }}
        endAdornment={
          <InputAdornment
            position="end"
            sx={{ position: 'absolute', right: '15px' }}
          >
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => showPassword(setHidePassword)}
              edge="end"
              sx={{ color: '#717171' }}
            >
              {hidePassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      <div className={style.errorMessage}>{isError && helperText}</div>
    </FormControl>
  );
};

export default PasswordInput;
