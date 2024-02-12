import { SendResponseFunction } from '../models/index';

export const handleBadRequest = (sendResponse: SendResponseFunction, message: string) => {
  sendResponse({ statusCode: 400, body: message });
};

export const handleNotFound = (sendResponse: SendResponseFunction, message: string) => {
  sendResponse({ statusCode: 404, body: message });
};

export const handleServerError = (sendResponse: SendResponseFunction) => {
  sendResponse({ statusCode: 500, body: 'Error occured on the Server' });
};

export const handleInvalidMethod = (sendResponse: SendResponseFunction) => {
  sendResponse({ statusCode: 400, body: 'Invilid method used for this endpoint' });
};
