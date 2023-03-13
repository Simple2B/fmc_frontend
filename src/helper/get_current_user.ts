import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { UserType } from '@/store/types/user';
import { IStudentProfile } from '@/store/types/users/student/studentType';
import { redirect } from 'next/navigation';
import { getErrorMessage } from './error_function';

export async function getCurrentUser(
  userType: string,
  setProfile?: React.Dispatch<React.SetStateAction<IStudentProfile>>,
  setIsLoad?: React.Dispatch<React.SetStateAction<boolean>>,
  setSuccess?: React.Dispatch<React.SetStateAction<boolean>>,
  setError?: React.Dispatch<React.SetStateAction<string | null>>,
  error?: string | null
) {
  if (setSuccess) setSuccess(false);
  if (userType === UserType.student) {
    if (setIsLoad) setIsLoad(true);
    const res = await studentClientApi.checkStudent();
    if (res) {
      const studentProfile = await studentClientApi.studentGetProfile();
      if (setProfile) setProfile(studentProfile);
      if (setIsLoad) setIsLoad(false);
      if (setSuccess) setSuccess(true);
    } else {
      if (setIsLoad) setIsLoad(false);
      if (error && setError) getErrorMessage(error, setError);
      redirect('/sign_in/student');
    }
  }

  if (userType === UserType.coach) {
    const res = await coachClientApi.checkCoach();
    console.log('coach: res ', res);
    if (res) {
      const coachProfile = await coachClientApi.coachGetProfile();
      if (setProfile) setProfile(coachProfile);
      if (setIsLoad) setIsLoad(false);
      if (setSuccess) setSuccess(true);
    } else {
      if (setIsLoad) setIsLoad(false);
      if (error && setError) getErrorMessage(error, setError);
      redirect('/sign_in/coach');
    }
  }
  if (setIsLoad) setIsLoad(false);
}
