import { UserData } from 'models';

export const validateUserData = (user: UserData) => {
  return !!user.age && !!user.hobbies && !!user.name;
};
