import { Box, Checkbox } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import styles from './TermCheckbox.module.sass';

export interface ITermCheckbox {
  checked: boolean;
  handleCheckedTerms: () => void;
}

// eslint-disable-next-line no-empty-pattern
const TermCheckbox: React.FC<ITermCheckbox> = ({
  checked,
  handleCheckedTerms,
}) => {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        ml: -1.5,
        mt: 1,
      }}
    >
      <Checkbox
        checked={checked}
        onChange={handleCheckedTerms}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <span className={styles.title}>
        I agree with the <Link href="/sign_up/terms">Terms and Conditions</Link>
        and
        <Link href="/sign_up/privacy"> Privacy Policy</Link>
      </span>
    </Box>
  );
};

export default TermCheckbox;
