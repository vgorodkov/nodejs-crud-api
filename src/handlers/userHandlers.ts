import { handleBadRequest } from './responseErrorHandlers';
import { users } from '../db';
import { validateUserData } from '../utils/validateUserData';
import { addUuidToUserData } from '../utils/addUuidToUserData';
import { SendResponseFunction, User, UserData } from '../models';
import { UUID } from 'crypto';
import { strings } from '../constants';

export const handleGetUsers = (sendResponse: SendResponseFunction) => {
  sendResponse({ statusCode: 200, body: users });
};

export const handleGetUser = (sendResponse: SendResponseFunction, user: User) => {
  sendResponse({
    statusCode: 200,
    body: user,
  });
};

export const handlePostUser = (sendResponse: SendResponseFunction, userData: UserData) => {
  const isValidData = validateUserData(userData);
  const user = addUuidToUserData(userData);
  if (isValidData) {
    users.push(user);
    sendResponse({
      statusCode: 201,
      body: user,
    });
  } else {
    handleBadRequest(sendResponse, strings.errors.requiredFields);
  }
};

export const handlePutRequest = (
  sendResponse: SendResponseFunction,
  userId: UUID,
  userData: UserData,
) => {
  const editedUser = { id: userId, ...userData };
  const isValidData = validateUserData(userData);
  if (!isValidData) {
    handleBadRequest(sendResponse, strings.errors.requiredFields);
    return;
  }
  users.forEach((user, index) => {
    if (user.id === userId) {
      users[index] = editedUser;
    }
  });
  sendResponse({
    statusCode: 200,
    body: editedUser,
  });
};

export const handleDeleteRequest = (sendResponse: SendResponseFunction, userId: UUID) => {
  const indexToDelete = users.findIndex((user) => user.id === userId);
  users.splice(indexToDelete, 1);
  sendResponse({
    statusCode: 204,
    body: `Succesfully deleted user with id: ${userId}`,
  });
};
