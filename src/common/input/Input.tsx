import TextField from '@mui/material/TextField';
import * as React from 'react';

export interface IInput {
  isError: boolean;
  helperText: string;
  name: string;
  label: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange(e: { target: { value: string } }): void;
  sx?: any;
  type?: string;
}

// eslint-disable-next-line no-empty-pattern
const Input: React.FC<IInput> = ({
  isError,
  helperText,
  name,
  label,
  value,
  onChange,
  sx,
  type,
}) => {
  const inputStyle = {
    WebkitBoxShadow: '0 0 0 1000px #FFF inset',
    WebkitTextFillColor: '#000',
  };

  return (
    <TextField
      error={isError}
      autoFocus
      // inputRef={(input) => input && input.focus()}
      variant="outlined"
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      helperText={helperText}
      fullWidth
      sx={sx}
      type={type}
      inputProps={{ style: inputStyle }}
    />
  );
};

export default Input;
