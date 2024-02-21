export const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const BASE_ENDPOINT = 'api/users';

export const resourceIdMethods = ['GET', 'PUT', 'DELETE'];

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const strings = {
  errors: {
    requiredFields: 'Request body does not contain required fields',
    invalidJSON: 'Invalid JSON format',
    urlOrMethodNotFound: 'There is no Url or HttpMethod provided',
    invalidUserId:
      'Invalid user id. RFC 4122 version 4 UUID is required. For example, by Node.js crypto.randomUUID()',
    noSuchUser: 'There is no user with this id',
  },
};
