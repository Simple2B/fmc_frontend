import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { ProfilesService, WhoamiService } from '@/services';
import { UserType } from '@/store/types/user';
import { IUserProfile } from '../store/types/user';
import { getErrorMessage } from './error_function';

export async function getCurrentUser(
  userType: string,
  setProfile?: React.Dispatch<React.SetStateAction<IUserProfile>>,
  setIsLoad?: React.Dispatch<React.SetStateAction<boolean>>,
  setSuccess?: React.Dispatch<React.SetStateAction<boolean>>,
  setError?: React.Dispatch<React.SetStateAction<string | null>>
) {
  if (setSuccess) setSuccess(false);
  try {
    if (userType === UserType.student) {
      if (setIsLoad) setIsLoad(true);
      const res = await WhoamiService.apiWhoamiStudent();
      if (res) {
        try {
          // const studentProfile = await studentClientApi.studentGetProfile();
          const studentProfile = await ProfilesService.apiGetStudentProfile();
          if (setProfile) setProfile(studentProfile);
          if (setIsLoad) setIsLoad(false);
          if (setSuccess) setSuccess(true);
        } catch (error: any) {
          if (setIsLoad) setIsLoad(false);
          if (setError) getErrorMessage(error.message, setError);
        }
      }
    }
    if (userType === UserType.coach) {
      const res = await coachClientApi.checkCoach();
      console.log('coach: res ', res);
      if (res) {
        try {
          const coachProfile = await coachClientApi.coachGetProfile();
          if (setProfile) setProfile(coachProfile);
          if (setIsLoad) setIsLoad(false);
          if (setSuccess) setSuccess(true);
        } catch (error: any) {
          if (setIsLoad) setIsLoad(false);
          if (setError) getErrorMessage(error.message, setError);
        }
      }
    }
  } catch (error: any) {
    if (setIsLoad) setIsLoad(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  }
  if (setIsLoad) setIsLoad(false);
}
