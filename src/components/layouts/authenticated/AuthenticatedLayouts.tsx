/* eslint-disable no-unused-vars */
import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import NavBar from '@/common/nav_bar/NavBar';
import SideBar, { IItem } from '@/common/side_bar/SideBar';
import { getCurrentUser } from '@/helper/get_current_user';
import { IStudentProfile } from '@/store/types/users/student/studentType';
import { Box, createTheme, PaletteMode, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface IStudentAuthenticatedLayout {
  children: any;
  userType: string;
  listItems: IItem[];
}

const AuthenticatedLayout: React.FC<IStudentAuthenticatedLayout> = ({
  children,
  userType,
  listItems,
}) => {
  const router = useRouter();

  const [profile, setProfile] = React.useState<IStudentProfile>({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    profile_picture: '',
    is_verified: false,
  });

  const [isLoad, setIsLoad] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isSuccess, setSuccess] = React.useState<boolean>(false);

  const [mode, setMode] = React.useState<PaletteMode>('light');

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  React.useEffect(() => {
    getCurrentUser(
      userType,
      setProfile,
      setIsLoad,
      setSuccess,
      setError
      // error
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setModalIsOpen(true);
        setError(null);
      }, 1000);
    }
  }, [modalIsOpen, error]);

  return (
    <Box>
      <NavBar
        username={profile.username}
        picture={profile.profile_picture}
        userType={userType}
        setIsLoad={setIsLoad}
        setProfile={setProfile}
      />
      <Stack direction="row" spacing="2" justifyContent="space-between">
        <SideBar listItems={listItems} />
        {children}
      </Stack>
      {isLoad && (
        <CustomModel isOpen={isLoad}>
          <Loader />
        </CustomModel>
      )}
      {error && !isSuccess && (
        <CustomModel
          isOpen={modalIsOpen}
          handleClick={() => setModalIsOpen(!modalIsOpen)}
        >
          <MessageBox
            error={error}
            handleClick={() => setModalIsOpen(!modalIsOpen)}
          />
        </CustomModel>
      )}
    </Box>
  );
};

export default AuthenticatedLayout;
