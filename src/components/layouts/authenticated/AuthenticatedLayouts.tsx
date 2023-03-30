/* eslint-disable no-unused-vars */
import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import NavBar from '@/common/nav_bar/NavBar';
import SideBar, { IItem } from '@/common/side_bar/SideBar';
import { getCurrentUser } from '@/helper/get_current_user';
import { IUserProfile } from '@/store/types/user';
import {
  Box,
  createTheme,
  PaletteMode,
  Stack,
  useMediaQuery,
} from '@mui/material';
import * as React from 'react';
import style from './AuthenticatedLayouts.module.sass';

export interface IStudentAuthenticatedLayout {
  children: any;
  userType: string;
  listItems: IItem[];
  isOpenMobSideBar: boolean;
  closeOpenMobSideBar: () => void;
}

const AuthenticatedLayout: React.FC<IStudentAuthenticatedLayout> = ({
  children,
  userType,
  listItems,
  isOpenMobSideBar,
  closeOpenMobSideBar,
}) => {
  const matches970 = useMediaQuery('(max-width:970px)');

  const [profile, setProfile] = React.useState<IUserProfile>({
    uuid: '',
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

  const MobSideBar = () => {
    return (
      <Box
        sx={{
          width: '252px',
          height: '100vh',
          backgroundColor: '#fff',
          position: 'absolute',
          boxShadow: '0px 0px 5px rgba(142, 142, 142, 0.25)',
          zIndex: 3,
        }}
      >
        <SideBar
          listItems={listItems}
          closeOpenMobSideBar={closeOpenMobSideBar}
        />
      </Box>
    );
  };

  return (
    <Stack sx={{ height: '100vh' }}>
      <NavBar
        username={
          profile.first_name.length > 0
            ? `${profile.first_name} ${profile.last_name}`
            : profile.username
        }
        picture={profile.profile_picture}
        userType={userType}
        setIsLoad={setIsLoad}
        setProfile={setProfile}
        closeOpenMobSideBar={closeOpenMobSideBar}
        isOpenMobSideBar={isOpenMobSideBar}
      />
      <Stack direction="row" justifyContent="space-between" flex={1}>
        <Box
          className={style.wrapperSideBar}
          sx={{
            display: matches970 ? 'none' : 'block',
          }}
        >
          <SideBar listItems={listItems} />
        </Box>
        {isOpenMobSideBar && <MobSideBar />}
        <Box
          sx={{
            borderLeft: matches970 ? '' : '.5px solid #DBDBDB',
            flex: 1,
          }}
        >
          {children}
        </Box>
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
            message={error}
            handleClick={() => setModalIsOpen(!modalIsOpen)}
          />
        </CustomModel>
      )}
    </Stack>
  );
};

export default AuthenticatedLayout;
