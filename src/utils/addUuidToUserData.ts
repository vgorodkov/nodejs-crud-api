import { randomUUID } from 'crypto';
import { UserData } from 'models';

export const addUuidToUserData = (userData: UserData) => {
  const uuid = randomUUID();
  return { id: uuid, ...userData };
};
