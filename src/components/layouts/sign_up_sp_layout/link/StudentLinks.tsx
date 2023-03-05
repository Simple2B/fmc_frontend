import Box from '@mui/material/Box';
import Link from 'next/link';
import * as React from 'react';
import style from '../SignUpSPLayout.module.sass';

export interface IStudentLinks {
  color: string;
}

const StudentLinks: React.FC<IStudentLinks> = ({ color }) => {
  const [isHoverInput1, setIsHoverInput1] = React.useState(false);
  const [isHoverInput2, setIsHoverInput2] = React.useState(false);

  const handleMouseEnter = (setIsHover: any) => {
    setIsHover(true);
  };
  const handleMouseLeave = (setIsHover: any) => {
    setIsHover(false);
  };

  return (
    <Box className={style.wrapperStudentLinks}>
      <Link
        href="/sign_in/coach"
        className={`${style.commonTextStyle} ${style.btnText}`}
        style={{
          color: `${isHoverInput1 ? color : 'rgb(113, 113, 113)'}`,
          borderBottom: `2px solid ${
            isHoverInput1 ? color : 'rgb(113, 113, 113)'
          }`,
        }}
        onMouseEnter={() => handleMouseEnter(setIsHoverInput1)}
        onMouseLeave={() => handleMouseLeave(setIsHoverInput1)}
      >
        Coach
      </Link>
      <Box className={`${style.commonTextStyle} ${style.text}`} color={color}>
        or
      </Box>
      <Link
        href="/sign_in/student"
        className={`${style.commonTextStyle} ${style.btnText}`}
        style={{
          color: `${isHoverInput2 ? color : 'rgb(113, 113, 113)'}`,
          borderBottom: `2px solid ${
            isHoverInput2 ? color : 'rgb(113, 113, 113)'
          }`,
        }}
        onMouseEnter={() => handleMouseEnter(setIsHoverInput2)}
        onMouseLeave={() => handleMouseLeave(setIsHoverInput2)}
      >
        Student
      </Link>
    </Box>
  );
};

export default StudentLinks;
